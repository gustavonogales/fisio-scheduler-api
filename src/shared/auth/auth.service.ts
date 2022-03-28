import { SECRET } from '@/constants';
import { Credentials } from './dto/credentials.dto';
import { classToPlain } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { User } from '@/user/entities/user.entity';
import { HashService } from '@/shared/hash/hash.service';
import { Request } from 'express';
import { JwtPayloadDto } from './dto/JwtPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  decode(req: Request): JwtPayloadDto {
    return this.jwtService.decode(
      req.headers.authorization.split(' ')[1],
    ) as JwtPayloadDto;
  }

  async validateUser({ email, password }: Credentials) {
    const user = await this.userService.findByEmail(email);

    const passwordMatch = await this.hashService.compareHash(
      password,
      user.password,
    );

    if (user && passwordMatch) {
      return user;
    }
    return null;
  }

  async singIn(user: any): Promise<Auth> {
    return {
      user: classToPlain(new User(user)),
      token: this.jwtService.sign({
        sub: user?.id,
        type: user?.userType?.type,
      }),
    };
  }
}
