import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../../dtos/auth/create-auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }
}
