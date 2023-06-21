import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class EmailLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;
}
