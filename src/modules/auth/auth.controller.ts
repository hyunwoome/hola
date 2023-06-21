import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailSignupDto } from '../../dtos/auth/email-signup.dto';
import { ApiResponse } from '../../utils/response.context';
import { EmailLoginDto } from '../../dtos/auth/email-login.dto';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';
import { GoogleLoginDto } from '../../dtos/auth/google-login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email-signup')
  async emailSignup(@Body() emailSignupDto: EmailSignupDto) {
    await this.authService.emailSignup(emailSignupDto);
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '회원가입에 성공하였습니다.',
      data: null,
    });
  }

  @Post('email-login')
  async emailLogin(@Body() signInAuthReqDto: EmailLoginDto) {
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '이메일 로그인에 성공하였습니다.',
      data: await this.authService.emailLogin(signInAuthReqDto),
    });
  }

  @Get('google-login')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin() {
    return null;
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginRedirect(@Req() emailSignupDto: EmailSignupDto) {
    return new ApiResponse({
      status: HttpStatus.OK,
      message: '구글 로그인에 성공하였습니다.',
      data: await this.authService.googleLogin(emailSignupDto),
    });
  }
}
