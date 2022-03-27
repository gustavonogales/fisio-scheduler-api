import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}
  private readonly select = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    userTypeId: false,
    password: false,
    userAppointments: false,
    professionalAppointments: false,
    userType: {
      select: {
        type: true,
        id: false,
      },
    },
  };

  async create(createUserDto: CreateUserDto) {
    const userType = await this.db.userType.findFirst({
      where: {
        type: createUserDto.type,
      },
    });

    delete createUserDto.type;

    return this.db.user.create({
      select: this.select,
      data: {
        ...createUserDto,
        userTypeId: userType.id,
      },
    });
  }

  findAll(type: string) {
    return this.db.user.findMany({
      select: this.select,
      ...(type ? { where: { userType: { type } } } : {}),
    });
  }

  findOne(id: string) {
    return this.db.user.findUnique({ select: this.select, where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      select: this.select,
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.db.user.delete({ select: this.select, where: { id } });
  }
}
