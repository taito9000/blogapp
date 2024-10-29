import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleService } from 'src/services/articles/article.service';

@Injectable()
export class ExistArticleIdPipe implements PipeTransform {
  constructor(private readonly articleService: ArticleService) {}

  async transform(value: string) {
    // 現状の使い方ではvalueがundefinedやnullになることはない想定だが、一応チェック
    if (!value) throw new NotFoundException('指定された記事が存在しません');

    // 記事が存在しない場合に例外をスロー
    const article = await this.articleService.getOneById(+value, false);
    if (!article) throw new NotFoundException('指定された記事が存在しません');

    // 正常な場合は記事のIDを返す
    return article.id;
  }
}
