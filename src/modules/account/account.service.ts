import { Injectable } from '@nestjs/common';

import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AccountService {
  constructor(private configService: ConfigService) {}

  public async getGithubInfo(code: string) {
    const getTokenUrl = 'https://github.com/login/oauth/access_token';

    const request = {
      code,
      client_id: this.configService.get<string>('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get<string>('GITHUB_SECRET_ID'),
    };

    const response: AxiosResponse = await axios.post(getTokenUrl, request, {
      headers: {
        accept: 'application/json',
      },
    });

    const { access_token } = response.data;

    const getUserUrl = 'https://api.github.com/user';

    const { data } = await axios.get(getUserUrl, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { email } = data;

    return {
      email,
    };
  }
}
