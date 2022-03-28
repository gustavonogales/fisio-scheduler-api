import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  startTime: Date;

  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  professionalId: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;
}
