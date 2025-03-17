import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from 'src/controllers/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/controllers/articles/dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  // ページごとに記事を取得し、総記事数も返す
  async getArticles(page: number, itemsPerPage: number) {
    const skip = (page - 1) * itemsPerPage;
    const articles = await this.prisma.article.findMany({
      skip: skip,
      take: itemsPerPage,
    });
    const totalArticles = await this.prisma.article.count();
    return {
      articles,
      totalArticles,
    };
  }

  // データが存在しなかった場合、defaultでエラーをthrowするようにしている。
  getOneById(id: number, shouldThrowError: boolean = true) {
    if (shouldThrowError) {
      return this.prisma.article.findUniqueOrThrow({
        where: { id: id },
      });
    } else {
      return this.prisma.article.findUnique({
        where: { id: id },
      });
    }
  }

  create(createArticleDto: CreateArticleDto, userId: number) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        createdBy: {
          // relation用
          connect: { id: userId },
        },
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto, userId: number) {
    return this.prisma.article.update({
      where: { id: id },
      data: {
        ...updateArticleDto,
        updatedBy: {
          // relation用
          connect: { id: userId },
        },
      },
    });
  }

  delete(id: number) {
    return this.prisma.article.delete({
      where: { id: id },
    });
  }
}
