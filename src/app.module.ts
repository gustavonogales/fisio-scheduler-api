import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { AppointmentModule } from './appointment/appointment.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 10,
      max: 10,
    }),
    UserModule,
    SharedModule,
    AppointmentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
