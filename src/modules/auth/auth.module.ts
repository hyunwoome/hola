import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { account } from '../../entities/account.entity';
import { account_profile } from '../../entities/account-profile.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountProfileRepository } from '../../repositories/account-profile.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccountService } from '../account/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([account, account_profile]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
          },
        };
      },
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
