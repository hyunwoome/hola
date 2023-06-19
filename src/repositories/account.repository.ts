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

  async getPassword(email: string) {
    return await this.createQueryBuilder('account')
      .select('account')
      .where('account.email = :email', { email })
      .getOne();
  }

  async getAccountById(accountId: number) {
    return this.createQueryBuilder('account')
      .innerJoin('account.account_profile_id', 'account_profile')
      .select([
        'account.id',
        'account.email',
        'account_profile.id',
        'account_profile.nickname',
      ])
      .where('account.id = :id', {
        id: accountId,
      })
      .getOne();
  }

  async createAccount(
    accountProfileId: number,
    email: string,
    password: string,
    loginType: string,
  ) {
    return this.createQueryBuilder('account')
      .insert()
      .values({
        account_profile_id: accountProfileId,
        email: email,
        password: password,
        login_type: loginType,
        create_date: new Date(),
      })
      .execute();
  }
}
