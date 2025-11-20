// dto/get-shifts.dto.ts
import { IsDateString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class GetMonthlyShiftsDto {
  @IsInt()
  @Min(1970)
  @Max(3000)
  year: number;

  @IsInt()
  @Min(1)
  @Max(12)
  month: number;
}
