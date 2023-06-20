import { DataSource, Repository } from 'typeorm';
import { account } from '../entities/account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<account> {
  constructor(
    @InjectRepository(account)
    private readonly repository: Repository<account>,
    private readonly dataSource: DataSource,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async isEmailExists(email: string) {
    return await this.dataSource.manager.findOneBy(account, {
      email,
    });
  }

  async isEmailExist(email: string) {
    return await this.createQueryBuilder('account')
      .where('account.email = :email', {
        email,
      })
      .getExists();
  }

  async getPasswordByEmail(email: string) {
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
        'account_profile.custom_email',
        'account_profile.language',
        'account_profile.position',
        'account_profile.affiliation',
        'account_profile.github_url',
        'account_profile.blog_url',
        'account_profile.about_me',
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
