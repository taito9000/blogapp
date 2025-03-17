import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    // パスポートのローカルストラテジーの親に渡されるオブジェクトのdefaultのフィールド名がusenameとpasswordなので、emailとpasswordを読めるように変更
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // ユーザーの存在確認
  async validate(email: string, pass: string) {
    const user = await this.authService.validateUser(email, pass);

    if (!user || !user.id || !user.email || !user.permissionName) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
