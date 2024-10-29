import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/lib/interfaces';

// @User('key値')でログインユーザーの情報を取得できるようにする
export const User = createParamDecorator(
  // keyによって、JwtPayload型か、emailかuserIdを返す
  (key: string, ctx: ExecutionContext): JwtPayload | string | number => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return key ? user?.[key] : user;
  },
);
