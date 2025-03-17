/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Patch,
  Delete,
  UseGuards,
  Body,
  ParseIntPipe,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from 'src/services/users/user.service';
import { Permission } from 'src/lib/decorator/permission.decorator';
import { PermissionGuard } from 'src/controllers/auth/permission.guard';
import { UpdateUserDto } from 'src/controllers/auth/dto/update-user.dto';
import { UserResponseDto } from 'src/controllers/users/dto/response-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Permission('admin')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ユーザー全件取得
  @Get()
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.getAll();
    const userResponseDtos = users.map((user) => new UserResponseDto(user));
    return userResponseDtos;
  }

  // idを指定で、ユーザー情報を取得する。
  @Get(':id')
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.userService.getOneById(id);
    return new UserResponseDto(user);
  }

  // idを指定し、user_nameかemailのいずれか、または、両方を更新する。
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return new UserResponseDto(updatedUser);
  }

  // idを指定し、ユーザーを削除する。
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const deletedUser = await this.userService.delete(id);
    return new UserResponseDto(deletedUser);
  }
}
