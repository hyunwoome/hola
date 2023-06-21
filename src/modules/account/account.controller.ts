import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiResponse } from '../../utils/response.context';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { AccountProfileDto } from '../../dtos/account-profile/account-profile.dto';

@Controller('api/account-profile')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccount(@Param('id') accountId: number) {
    return new ApiResponse({
      status: HttpStatus.OK,
      message: 'OK',
      data: await this.accountService.getAccountById(accountId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createAccountProfile(@Body() AccountProfileDto: AccountProfileDto) {
    return new ApiResponse({
      status: HttpStatus.OK,
      message: 'OK',
      data: await this.accountService.createAccountProfileById(
        AccountProfileDto,
      ),
    });
  }
}
