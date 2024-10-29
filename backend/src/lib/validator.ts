import { Injectable } from '@nestjs/common';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/services/users/user.service';

@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
@Injectable()
export default class IsUniqueEmail implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    if (!value) return false;
    const res = await this.userService.getOneByEmail(value, false);
    if (res) {
      return false;
    }
    return true;
  }
}
