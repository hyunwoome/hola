import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { account_profile } from '../entities/account-profile.entity';
import { AccountDto } from '../dtos/account-profile/account.dto';
import { AccountProfileDto } from '../dtos/account-profile/account-profile.dto';

@Injectable()
export class AccountProfileRepository extends Repository<account_profile> {
  constructor(
    @InjectRepository(account_profile)
    private readonly repository: Repository<account_profile>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createAccountProfile(accountProfileDto: AccountProfileDto) {
    const {
      email,
      account_type,
      nickname,
      language,
      position,
      affiliation,
      githubUrl,
      blogUrl,
      aboutMe,
    } = accountProfileDto;
    return this.createQueryBuilder('account_profile')
      .insert()
      .values({
        account_type: account_type,
        custom_email: email,
        nickname: nickname,
        language: language,
        position: position,
        affiliation: affiliation,
        github_url: githubUrl,
        blog_url: blogUrl,
        about_me: aboutMe,
        create_date: new Date(),
      })
      .execute();
  }
}
