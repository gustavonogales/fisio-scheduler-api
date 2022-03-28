import { DatabaseService } from '@/shared/database/database.service';
import { UserService } from '@/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private userService: UserService, private db: DatabaseService) {}

  async create(id: string, data: CreateAppointmentDto) {
    const appointment = await this.db.appointment.findFirst({
      where: {
        OR: [{ professionalId: id }, { clientId: id }],
        AND: {
          startTime: {
            gte: data.startTime,
          },
          endTime: {
            lte: data.endTime,
          },
        },
      },
    });

    if (appointment) {
      throw new HttpException(
        {
          status: HttpStatus.AMBIGUOUS,
          error: 'Appointment already exists',
        },
        HttpStatus.AMBIGUOUS,
      );
    }

    return this.db.appointment.create({
      data,
    });
  }

  findAll(id: string, expand: boolean, startTime: Date, endTime: Date) {
    return this.db.appointment.findMany({
      ...(expand ? { include: { client: true } } : {}),
      where: {
        OR: [{ professionalId: id }, { clientId: id }],
        ...(!!startTime || !!endTime
          ? {
              AND: {
                ...(!!startTime
                  ? {
                      startTime: {
                        gte: startTime,
                      },
                    }
                  : {}),
                ...(!!endTime
                  ? {
                      endTime: {
                        lte: endTime,
                      },
                    }
                  : {}),
              },
            }
          : {}),
      },
    });
  }

  findOne(id: string) {
    return this.db.appointment.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.db.appointment.update({
      data: updateAppointmentDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.db.appointment.delete({
      where: { id },
    });
  }
}
