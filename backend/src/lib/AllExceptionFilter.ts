import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // HTTPステータスコードのみを返す
    const responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: this.extractMessage(exception),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  // エラーメッセージを抽出する
  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // HttpExceptionはオブジェクトか文字列になると公式にあるので、両方やる
      if (typeof exceptionResponse === 'string') {
        // responseが文字列の場合、そのまま返す
        return exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        // responseがobjectの場合、messageプロパティの取得を試みる
        const { message } = exceptionResponse as {
          message?: string | string[];
        };

        if (Array.isArray(message)) {
          // messageが配列の場合、最初の要素を返す
          return message[0];
        } else if (typeof message === 'string') {
          // messageが文字列の場合、そのまま返す
          return message;
        }
      }
    }

    // HTTP exceptionsではない場合、messageがない場合はデフォルトのメッセージを返す
    return 'Internal server error';
  }
}
