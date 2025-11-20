import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class CreateItemCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  quickPrices?: number[];

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
