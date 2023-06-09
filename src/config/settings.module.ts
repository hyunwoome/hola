import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule,
  ],
})
export class SettingsModule {}
