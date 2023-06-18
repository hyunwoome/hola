import { Repository } from 'typeorm';
import { account } from '../entities/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<account> {
  constructor(
    @InjectRepository(account)
    private readonly repository: Repository<account>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async isEmailExist(email: string) {
    return await this.createQueryBuilder('account')
      .where('account.email = :email', {
        email,
      })
      .getExists();
  }

  async createAccountProfile() {
    return await this.createQueryBuilder('account_');
  }
}
