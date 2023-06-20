import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { SignupReqDto } from '../../dtos/auth/signup.req.dto';
import { DataSource } from 'typeorm';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import * as bcrypt from 'bcryptjs';
import { SigninReqDto } from '../../dtos/auth/signin.req.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountProfileRepository: AccountProfileRepository,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupAuthReqDto: SignupReqDto) {
    const { email, password } = signupAuthReqDto;
    if (await this.accountRepository.isEmailExist(email)) {
      throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    }

    let hashedPassword: '';
    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createAccountProfileResult =
        await this.accountProfileRepository.createAccountProfile(
          signupAuthReqDto,
        );
      await this.accountRepository.createAccount(
        createAccountProfileResult.identifiers[0]['id'],
        email,
        hashedPassword,
        'email',
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async signin(signinAuthReqDto: SigninReqDto) {
    const { email, password } = signinAuthReqDto;
    console.log(await this.accountRepository.isEmailExists(email));
    // if (!(await this.accountRepository.isEmailExist(email))) {
    //   throw new HttpException(
    //     '회원가입을 먼저 진행해주세요.',
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }
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
}
