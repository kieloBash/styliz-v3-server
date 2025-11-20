// dto/create-shift.dto.ts
import { IsDateString, IsEnum, IsInt, Min } from 'class-validator';
import { ShiftType } from 'generated/prisma';

export class CreateShiftDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsDateString()
  startTime: string; // ISO string

  @IsDateString()
  endTime?: string; // optional

  @IsEnum(ShiftType)
  type: ShiftType;
}
