import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserService } from 'src/services/users/user.service';
import { Msg, User } from 'src/lib/interfaces';
import { CreateUserDto } from 'src/controllers/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private userService: UserService,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async login(user: { id: number; email: string }): Promise<{
    accessToken: string;
    userData: { userId: number; permissionName: string };
  }> {
    const payload = {
      email: user.email,
      userId: user.id,
    };
    const permissionName = await this.getPermissionName(user.id);
    return {
      accessToken: this.jwtService.sign(payload),
      userData: { userId: user.id, permissionName: permissionName },
    };
  }

  // 引数のemailとpasswordが一致するユーザーが存在するか確認。存在すればユーザー情報を返す。
  // eslint-disable-next-line prettier/prettier
  async validateUser(
    email: string,
    password: string,
  ): Promise<User & { permissionName: string }> {
    const user = await this.userService.getOneByEmail(email);
    const permissionName = await this.getPermissionName(user.id);
    if (user && (await bcrypt.compare(password, user.password))) {
      // passwordを返さないようにする
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result, permissionName };
    }
    return null;
  }

  // ユーザー登録
  async signUp(createUserDto: CreateUserDto): Promise<Msg> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const permissionList = await this.prismaService.permission.findMany();
    // permission_nameが'user'のpermission_idを取得
    const userPermission = permissionList.find(
      (value) => value.permission_name === 'user',
    ).id;

    try {
      await this.prismaService.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            user_name: createUserDto.user_name,
            email: createUserDto.email,
            password: hashedPassword,
          },
        });

        await tx.role.create({
          data: {
            user_id: newUser.id,
            permission_id: userPermission,
          },
        });
      });

      return { message: 'Successfully registered!' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Registration failed');
      }
      throw error;
    }
  }

  // 引数のユーザーが持つpermission_nameを返す
  async getPermissionName(userId: number): Promise<string> {
    const role = await this.prismaService.role.findUniqueOrThrow({
      where: { user_id: userId },
    });

    const permission = await this.prismaService.permission.findUniqueOrThrow({
      where: { id: role.permission_id },
    });

    return permission.permission_name;
  }
}
