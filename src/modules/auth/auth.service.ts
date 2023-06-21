import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { EmailSignupDto } from '../../dtos/auth/email-signup.dto';
import { DataSource } from 'typeorm';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import * as bcrypt from 'bcryptjs';
import { EmailLoginDto } from '../../dtos/auth/email-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountProfileRepository: AccountProfileRepository,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async emailSignup(emailSignupDto: EmailSignupDto) {
    const { email, password, loginType } = emailSignupDto;
    if (await this.accountRepository.isEmailExist(email)) {
      throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    }

    let hashedPassword: null;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await this.accountRepository.createAccount(
      email,
      hashedPassword,
      loginType,
    );
  }

  async emailLogin(emailLoginDto: EmailLoginDto) {
    const { email, password } = emailLoginDto;
    if (!(await this.accountRepository.isEmailExist(email))) {
      throw new HttpException(
        '회원가입을 먼저 진행해주세요.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const existAccount = await this.accountRepository.getPasswordByEmail(email);
    const match = await bcrypt.compare(password, existAccount.password);
    if (!match) {
      throw new HttpException('비밀번호가 다릅니다.', HttpStatus.BAD_REQUEST);
    }
    const payload = { id: existAccount.id, email: existAccount.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // TODO: 1. emailSignupDto 이름 바꾸기 (OAuth 들도 다 써야하므로 범용적으로)
  // TODO: 2. 구글 로그인할 때, 회원가입도 잘 되는지 테스트하기
  async googleLogin(emailSignupDto: EmailSignupDto) {
    return await this.emailSignup(emailSignupDto);
  }
}
