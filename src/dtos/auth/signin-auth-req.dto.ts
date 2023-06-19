import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class SigninAuthReqDto {
  // account
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(5)
  password: string;
}
