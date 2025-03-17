import { Module } from '@nestjs/common';
import { UserService } from 'src/services/users/user.service';
import { UserController } from 'src/controllers/users/user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/modules/auth.module';
import IsUniqueEmail from 'src/lib/validator';
import { JwtStrategy } from 'src/controllers/auth/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, IsUniqueEmail, JwtStrategy],
  imports: [AuthModule],
})
export class UserModule {}
