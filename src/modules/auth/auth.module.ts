import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { account } from '../../entities/account.entity';
import { account_profile } from '../../entities/account-profile.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { AccountService } from '../account/account.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([account, account_profile]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    AccountRepository,
    AccountProfileRepository,
  ],
})
export class AuthModule {}
