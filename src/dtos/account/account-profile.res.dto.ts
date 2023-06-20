import { IsNotEmpty, IsEmail, IsString, IsEmpty } from 'class-validator';

export class AccountProfileResDto {
  @IsString()
  @IsEmpty()
  nickname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  customEmail: string;

  @IsString()
  @IsEmpty()
  language: string;

  @IsString()
  @IsEmpty()
  position: string;

  @IsString()
  @IsEmpty()
  affiliation: string;

  @IsString()
  @IsEmpty()
  githubUrl: string;

  @IsString()
  @IsEmpty()
  blogUrl: string;

  @IsString()
  @IsEmpty()
  aboutMe: string;
}
