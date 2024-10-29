import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Permission } from 'src/lib/decorator/permission.decorator';
import { PermissionGuard } from 'src/controllers/auth/permission.guard';
import { ArticleService } from 'src/services/articles/article.service';
import { CreateArticleDto } from 'src/controllers/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/controllers/articles/dto/update-article.dto';
import { User } from 'src/lib/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ExistArticleIdPipe } from 'src/lib/validationPipe/ExistArticleId.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 記事をページごとに取得
  @Get()
  getArticles(
    @Query('page', ParseIntPipe) page: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number,
  ) {
    return this.articleService.getArticles(page, itemsPerPage);
  }

  // idを指定して記事を１件取得
  @Get('/:article_id')
  getOneById(@Param('article_id', ExistArticleIdPipe) id: number) {
    return this.articleService.getOneById(id);
  }

  // admin権限のみ記事作成可能
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permission('admin')
  @Post()
  // @User('userId')でログインユーザーのidを取得
  create(@Body() data: CreateArticleDto, @User('userId') userId: number) {
    return this.articleService.create(data, userId);
  }

  // admin権限のみ記事編集可能
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permission('admin')
  @Patch(':id')
  update(
    @Param('id', ExistArticleIdPipe) id: number,
    @Body() data: UpdateArticleDto,
    @User('userId') userId: number,
  ) {
    return this.articleService.update(id, data, userId);
  }

  // admin権限のみ記事削除可能
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permission('admin')
  @Delete(':id')
  delete(@Param('id', ExistArticleIdPipe) id: number) {
    return this.articleService.delete(id);
  }
}
