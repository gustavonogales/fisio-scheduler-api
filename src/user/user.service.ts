import { DatabaseService } from '@/shared/database/database.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'user Already exists',
        },
        HttpStatus.CONFLICT,
      );
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

    return this.db.user.create({
      ...this.options,
      data: {
        ...createUserDto,
        userTypeId: userType.id,
      },
    });
  }

  async findAll(type: string) {
    return this.db.user.findMany({
      ...this.options,
      where: {
        active: true,
        ...(type ? { userType: { type } } : {}),
      },
    });
  }

  async findOne(id: string) {
    return this.db.user.findUnique({
      ...this.options,
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.db.user.findUnique({
      ...this.options,
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userType = await this.db.userType.findFirst({
      where: {
        type: updateUserDto.type,
      },
    });

    delete updateUserDto.type;

    return this.db.user.update({
      ...this.options,
      data: { ...updateUserDto, userTypeId: userType.id },
      where: { id },
    });
  }

  async remove(id: string) {
    return this.db.user.update({
      ...this.options,
      data: {
        email: id,
        active: false,
      },
      where: { id },
    });
  }
}
