// dto/update-shift.dto.ts
import { IsDateString, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ShiftStatus, ShiftType } from 'generated/prisma';

export class UpdateShiftDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsEnum(ShiftType)
  type?: ShiftType;

  @IsOptional()
  @IsEnum(ShiftStatus)
  status: ShiftStatus;
}
