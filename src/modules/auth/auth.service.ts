import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { CreateAuthDto } from '../../dtos/auth/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;
    if (await this.accountRepository.isEmailExist(email)) {
      throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    }
    // const { password } = createAuthDto;
    // const {
    //   nickname,
    //   language,
    //   position,
    //   affiliation,
    //   githubUrl,
    //   blogUrl,
    //   aboutMe,
    // } = createAuthDto;
  }
}
