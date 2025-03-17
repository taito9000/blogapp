import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/modules/user.module';
import { AuthModule } from 'src/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './modules/article.module';

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ArticleModule],
})
export class AppModule {}
