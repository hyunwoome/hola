import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthReqDto } from '../../dtos/auth/signup-auth-req.dto';
import { ApiResponse } from '../../utils/response.context';
import { SigninAuthReqDto } from '../../dtos/auth/signin-auth-req.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupAuthReqDto: SignupAuthReqDto) {
    await this.authService.signup(signupAuthReqDto);
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '회원가입에 성공하였습니다.',
      data: null,
    });
  }

  @Post('signin')
  async signin(@Body() signInAuthReqDto: SigninAuthReqDto) {
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '로그인에 성공하였습니다.',
      data: await this.authService.signin(signInAuthReqDto),
    });
  }
}
