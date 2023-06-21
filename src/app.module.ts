import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { RootConfigModule } from './config/root-config.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [RootConfigModule, AuthModule, AccountModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
