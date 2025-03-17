import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from 'src/controllers/auth/dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  // データが存在しない場合にエラーを投げたい場合の方が多いので、defaultでエラーを投げる
  getOneById(id: number, shouldThrowError: boolean = true) {
    if (shouldThrowError) {
      return this.prisma.user.findUniqueOrThrow({
        where: { id: id },
      });
    } else {
      return this.prisma.user.findUnique({
        where: { id: id },
      });
    }
  }

  getOneByEmail(email: string, shouldThrowError: boolean = true) {
    if (shouldThrowError) {
      return this.prisma.user.findUniqueOrThrow({
        where: { email: email },
      });
    } else {
      return this.prisma.user.findUnique({
        where: { email: email },
      });
    }
  }

  update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
