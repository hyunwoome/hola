import { Module } from '@nestjs/common';
import { SettingsModule } from '../../config/settings.module';
import AccountService from './account.service';
import AccountController from './account.controller';

@Module({
  imports: [SettingsModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
