import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'generated/prisma';

export class RegisterUserRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  //   @IsStrongPassword()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  rate?: number;
}
