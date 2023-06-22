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
import { AccountDto } from '../../dtos/account-profile/account.dto';
import { ApiResponse } from '../../utils/response.context';
import { EmailLoginDto } from '../../dtos/auth/email-login.dto';
import { GoogleOAuthGuard } from '../../guards/google-oauth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: AccountDto) {
    await this.authService.signup(signupDto);
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '회원가입에 성공하였습니다.',
      data: null,
    });
  }

  @Post('email-login')
  async emailLogin(@Body() emailLoginDto: EmailLoginDto) {
    return new ApiResponse({
      status: HttpStatus.NO_CONTENT,
      message: '이메일 로그인에 성공하였습니다.',
      data: await this.authService.emailLogin(emailLoginDto),
    });
  }

  @Get('google-login')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin() {
    return null;
  }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginRedirect(@Req() req) {
    const user: AccountDto = req.user;
    return new ApiResponse({
      status: HttpStatus.OK,
      message: '구글 로그인에 성공하였습니다.',
      data: await this.authService.googleLogin(user),
    });
  }
}
