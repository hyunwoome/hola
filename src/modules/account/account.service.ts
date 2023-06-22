import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountProfileDto } from '../../dtos/account-profile/account-profile.dto';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import { AccountDto } from '../../dtos/account-profile/account.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountProfileRepository: AccountProfileRepository,
  ) {}

  async createAccount(accountDto: AccountDto) {
    return await this.accountRepository.createAccount(accountDto);
  }

  async getAccountById(accountId: number) {
    return await this.accountRepository.getAccountById(accountId);
  }

  // TODO: 프로필 생성 시 Account 에 profile_id 넣기
  async createAccountProfileById(accountProfileDto: AccountProfileDto) {
    return await this.accountProfileRepository.createAccountProfile(
      accountProfileDto,
    );
  }
}
