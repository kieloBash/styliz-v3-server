import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemCategoryDto } from 'src/requests/create';
import { UpdateItemCategoryDto } from 'src/requests/update';
import { ItemCategoryService } from 'src/services/item-category.service';

@Controller('api/item-categories')
export class ItemCategoryController {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @Post()
  create(@Body() dto: CreateItemCategoryDto) {
    return this.itemCategoryService.create(dto);
  }

  @Get()
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateItemCategoryDto,
  ) {
    return this.itemCategoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemCategoryService.remove(id);
  }
}
