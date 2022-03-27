import { LocalStrategy } from './local.strategy';
import { SECRET } from '@/constants';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
