import { PartialType } from '@nestjs/mapped-types';
import { CreateItemCategoryDto } from '../create';

export class UpdateItemCategoryDto extends PartialType(CreateItemCategoryDto) {}
