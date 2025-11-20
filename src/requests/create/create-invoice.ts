import {
  IsInt,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus } from 'generated/prisma';
import { CreateItemDto } from './create-item';

export class CreateInvoiceDto {
  @IsInt()
  subTotal: number;

  @IsOptional()
  @IsInt()
  freebies?: number;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @IsDateString()
  dateDelivered: string;

  @IsOptional()
  @IsDateString()
  dateIssued?: string;

  @IsInt()
  customerId: number;

  @IsInt()
  sellerId: number;

  @IsInt()
  platformId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items?: CreateItemDto[];
}
