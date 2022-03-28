import { UserType } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  @Exclude()
  userType: UserType;

  @Exclude()
  userTypeId: string;

  @Exclude()
  password: string;

  @Exclude()
  active: boolean;

  @Expose({ name: 'type' })
  getType() {
    return this.userType.type;
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
