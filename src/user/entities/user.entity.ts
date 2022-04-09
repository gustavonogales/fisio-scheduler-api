import { UserType } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => value.type)
  userType: UserType;

  @Exclude()
  userTypeId: string;

  @Exclude()
  password: string;

  @Exclude()
  active: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
