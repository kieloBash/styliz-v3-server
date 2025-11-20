import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ItemCategoryService } from 'src/services/item-category.service';

@Module({
  controllers: [],
  providers: [ItemCategoryService, PrismaService],
  exports: [ItemCategoryService],
})
export class ItemCategoryModule {}
