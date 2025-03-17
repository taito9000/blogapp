import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from 'src/services/articles/article.service';
import { ArticleController } from 'src/controllers/articles/article.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/modules/auth.module';
import { ExistArticleIdPipe } from 'src/lib/validationPipe/ExistArticleId.pipe';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService, ExistArticleIdPipe],
})
export class ArticleModule {}
