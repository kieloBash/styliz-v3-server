import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from '../create';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
