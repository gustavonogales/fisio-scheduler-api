import { UserService } from '@/user/user.service';
import { DatabaseService } from './../shared/database/database.service';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, DatabaseService, UserService],
})
export class AppointmentModule {}
