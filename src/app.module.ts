import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { RootConfigModule } from './config/root-config.module';

@Module({
  imports: [RootConfigModule, AuthModule, AccountModule],
})
export class AppModule {}
