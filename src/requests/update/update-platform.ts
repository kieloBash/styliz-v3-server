import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformDto } from '../create';

export class UpdatePlatformDto extends PartialType(CreatePlatformDto) {}
