import { SetMetadata } from '@nestjs/common';

export const permission_key = 'permission';
export const Permission = (decoratorValue: string) =>
  SetMetadata(permission_key, decoratorValue);
