import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { Jwt, Msg, User } from 'src/lib/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: Request & { user: User }): Promise<Jwt> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<Msg> {
    return this.authService.signUp(createUserDto);
  }
}
