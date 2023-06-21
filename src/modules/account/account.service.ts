import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountProfileDto } from '../../dtos/account-profile/account-profile.dto';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountProfileRepository: AccountProfileRepository,
  ) {}

  async getAccountById(accountId: number) {
    return await this.accountRepository.getAccountById(accountId);
  }

  async createAccountProfileById(accountProfileDto: AccountProfileDto) {
    return await this.accountProfileRepository.createAccountProfile(
      accountProfileDto,
    );
  }
}
