import { DatabaseService } from '@/shared/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { classToPlain } from 'class-transformer';
import { HashService } from '@/shared/hash/hash.service';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService, private hashService: HashService) {}
  private readonly options = {
    include: {
      userType: true,
    },
  };

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.db.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userFound) {
      throw new Error('user Already exists');
    }

    const userType = await this.db.userType.findFirst({
      where: {
        type: createUserDto.type,
      },
    });

    delete createUserDto.type;
    createUserDto.password = await this.hashService.generateHash(
      createUserDto.password,
    );

    const createdUser = await this.db.user.create({
      ...this.options,
      data: {
        ...createUserDto,
        userTypeId: userType.id,
      },
    });

    return classToPlain(new User(createdUser));
  }

  async findAll(type: string) {
    const users = await this.db.user.findMany({
      ...this.options,
      ...(type ? { where: { userType: { type } } } : {}),
    });

    return classToPlain(users.map((user) => new User(user)));
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      ...this.options,
      where: { id },
    });

    return classToPlain(new User(user));
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      ...this.options,
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.db.user.update({
      ...this.options,
      data: updateUserDto,
      where: { id },
    });
    return classToPlain(new User(user));
  }

  async remove(id: string) {
    const user = await this.db.user.delete({
      ...this.options,
      where: { id },
    });
    return classToPlain(new User(user));
  }
}
