import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from '../create';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}
