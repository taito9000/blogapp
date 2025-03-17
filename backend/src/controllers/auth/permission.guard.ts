import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permission_key } from 'src/lib/decorator/permission.decorator';
import { AuthService } from 'src/services/auth/auth.service';

// 権限の確認を行うGuard
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // クラスとメソッドの@Permissionデコレータで指定された権限名を取得
    // 両方指定されている場合は、メソッドで指定されてるものが取得される
    const requiredPermissionName = this.reflector.getAllAndOverride<string[]>(
      permission_key,
      [context.getHandler(), context.getClass()],
    );

    // @Permissionデコレータでの指定がない場合はtrueを返してロール権限の確認を行わない
    if (!requiredPermissionName) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const permissionName = await this.authService.getPermissionName(
      user.userId,
    );

    return requiredPermissionName.includes(permissionName);
  }
}
