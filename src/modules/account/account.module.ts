import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { account } from '../../entities/account.entity';
import { account_profile } from '../../entities/account-profile.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from '../../repositories/account.repository';
import { JwtStrategy } from '../auth/security/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([account, account_profile])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, JwtStrategy],
})
export class AccountModule {}
