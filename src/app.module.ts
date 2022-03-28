import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './shared/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, SharedModule, AppointmentModule],
})
export class AppModule {}
