import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
// import configuration from './config/configuration';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from './config/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
