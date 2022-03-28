import { User } from '@prisma/client';

export class Appointment {
  id: string;
  startTime: Date;
  endTime: Date;
  client: User;
  professional: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Appointment>) {
    Object.assign(this, partial);
  }
}
