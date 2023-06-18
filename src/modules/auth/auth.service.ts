import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { CreateAuthDto } from '../../dtos/auth/create-auth.dto';
import { DataSource } from 'typeorm';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountProfileRepository: AccountProfileRepository,
    private readonly dataSource: DataSource,
  ) {}

  async signUp(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    if (await this.accountRepository.isEmailExist(email)) {
      throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = password ? await bcrypt.hash(password, salt) : null;
    console.log(hashedPassword);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountProfileId =
        await this.accountProfileRepository.createAccountProfile(createAuthDto);
      console.log(accountProfileId);
      // await this.accountRepository.createAccount(
      //   accountProfileId,
      //   email,
      //   hashedPassword,
      // );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
