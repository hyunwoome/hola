import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { account } from '../../entities/account.entity';
import { account_profile } from '../../entities/account-profile.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([account, account_profile])],
  controllers: [AuthController],
  providers: [AuthService, AccountRepository, AccountProfileRepository],
})
export class AuthModule {}
