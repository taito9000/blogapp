import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // デフォルトのハッシュ化したパスワードを作成
  const hashedPassword = await bcrypt.hash('1234qweR', 12);
  return prisma.$transaction(async (tx) => {
    // デフォルトの権限を作成する
    const adminPermission = await tx.permission.create({
      data: {
        // 管理者権限
        permission_name: 'admin',
        explanation: 'Administrator with full access',
      },
    });

    const userPermission = await tx.permission.create({
      data: {
        // ユーザー権限
        permission_name: 'user',
        explanation: 'Regular user with limited access',
      },
    });

    // デフォルトのユーザーを作成
    const user1 = await tx.user.create({
      data: {
        user_name: 'admin admin',
        email: 'admin@admin.com',
        password: hashedPassword,
      },
    });

    const user2 = await tx.user.create({
      data: {
        user_name: 'user user',
        email: 'user@user.com',
        password: hashedPassword,
      },
    });

    // デフォルトのユーザーに権限を割り当てる
    await tx.role.createMany({
      data: [
        {
          user_id: user1.id,
          permission_id: adminPermission.id,
        },
        {
          user_id: user2.id,
          permission_id: userPermission.id,
        },
      ],
    });

    // 追加するユーザーの配列を作成
    const additionalUsersData = [...Array(8).keys()].map((i) => ({
      user_name: faker.person.fullName(),
      email: `test${i + 1}@example.com`,
      password: hashedPassword,
    }));

    // createManyで追加ユーザーを一括作成
    await tx.user.createMany({
      data: additionalUsersData,
    });

    // default以外の作成された追加ユーザーをデータベースから取得
    const additionalUsers = await tx.user.findMany({
      where: {
        email: {
          in: additionalUsersData.map((user) => user.email),
        },
      },
    });

    // 追加ユーザーに権限を割り当てる用の配列を作成
    const rolesData = additionalUsers.map((user) => ({
      user_id: user.id,
      permission_id: user.id % 2 === 0 ? userPermission.id : adminPermission.id,
    }));

    // createManyで権限を一括で割り当て
    await tx.role.createMany({
      data: rolesData,
    });

    // user1, user2を含めた全ユーザーの配列を作成
    const allUsers = [user1, user2, ...additionalUsers];

    // 記事の配列を作成
    const articlesData = [...Array(40).keys()].map((i) => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      image_url: faker.image.url(),
      created_user: allUsers[i % allUsers.length].id,
      updated_user: allUsers[i % allUsers.length].id,
    }));

    // createManyで記事を一括作成
    await tx.article.createMany({
      data: articlesData,
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
