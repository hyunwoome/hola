import { Controller, Post, Body } from '@nestjs/common';
import AccountService from './account.service';

@Controller('api/account')
export default class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/github-info')
  public async getGithubInfo(@Body() code: string) {
    const user = await this.accountService.getGithubInfo(code);

    return {
      status: 200,
      message: '깃허브 유저 정보를 조회하였습니다.',
      data: {
        user,
      },
    };
  }
}
