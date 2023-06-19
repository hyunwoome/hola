import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiResponse } from '../../utils/response.context';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@Controller('api/account')
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
}
