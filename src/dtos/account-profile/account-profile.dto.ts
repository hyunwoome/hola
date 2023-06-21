import {
  IsString,
  IsUrl,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

enum Position {
  Frontend = '프론트엔드',
  Backend = '백엔드',
  Mobile = '모바일',
  ProductDesigner = '프로덕트 디자이너',
  ProjectManager = '프로젝트 매니저',
}

enum Affiliation {
  High = '고등학생',
  College = '대학생',
  JobSeeker = '취준생',
  Experienced = '현직자',
}

export class AccountProfileDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  account_type: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsEnum(Position)
  @IsOptional()
  position: Position;

  @IsEnum(Affiliation)
  @IsOptional()
  affiliation: Affiliation;

  @IsUrl()
  @IsOptional()
  githubUrl: string;

  @IsUrl()
  @IsOptional()
  blogUrl: string;

  @IsString()
  @IsOptional()
  aboutMe: string;
}
