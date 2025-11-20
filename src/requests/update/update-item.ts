import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from '../create';

export class UpdateItemDto extends PartialType(CreateItemDto) {}