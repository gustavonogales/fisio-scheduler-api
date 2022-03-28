import { JwtAuthGuard } from '@/shared/auth/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthService } from '@/shared/auth/auth.service';

@UseGuards(JwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Post()
  create(@Req() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    const { sub } = this.authService.decode(req);

    return this.appointmentService.create(sub, createAppointmentDto);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('expand') expand: boolean,
    @Query('startTime') startTime: Date,
    @Query('endTime') endtime: Date,
  ) {
    const { sub } = this.authService.decode(req);
    return this.appointmentService.findAll(sub, expand, startTime, endtime);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
