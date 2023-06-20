import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class SigninReqDto {
  // account
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(5)
  password: string;
}
