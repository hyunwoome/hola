import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class GoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
