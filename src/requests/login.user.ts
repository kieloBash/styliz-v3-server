import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginUserRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  password: string;
}
