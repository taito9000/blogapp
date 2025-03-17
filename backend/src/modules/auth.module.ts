import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/services/users/user.service';
import { JwtStrategy } from 'src/controllers/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/controllers/auth/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    JwtStrategy,
    LocalStrategy,
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1200s' },
      }),
    }),
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
