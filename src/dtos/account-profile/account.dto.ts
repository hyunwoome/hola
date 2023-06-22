import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(5)
  password: string | null;

  @IsString()
  @IsNotEmpty()
  loginType: string;
}
