import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AllExceptionsFilter } from 'src/lib/AllExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'XMLHttpRequest',
      'Authorization',
    ],
  });
  // NestJSのDIコンテナをclass-validatorで利用可能にする
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(4000);
}
bootstrap();
