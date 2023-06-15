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

  getAccounts() {
    return this.find();
  }
}
