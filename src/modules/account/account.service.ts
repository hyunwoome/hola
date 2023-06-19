import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getAccountById(accountId: number) {
    return await this.accountRepository.getAccountById(accountId);
  }
}
