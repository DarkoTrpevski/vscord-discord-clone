import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body(ValidationPipe) user: RegisterDTO) {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) user: LoginDTO) {
    return this.authService.login(user);
  }

}