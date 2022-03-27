import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Credentials } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async create(@Req() req) {
    return this.authService.singIn(req.user);
  }
}
