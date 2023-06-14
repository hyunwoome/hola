import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
// import configuration from './config/configuration';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from './config/settings.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [SettingsModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
