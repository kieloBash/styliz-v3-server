import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ItemStatus } from 'generated/prisma';

export class CreateItemDto {
  @IsInt()
  invoiceId: number;

  @IsInt()
  price: number;

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsEnum(ItemStatus)
  status?: ItemStatus;
}
