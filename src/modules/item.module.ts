import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ItemService } from 'src/services/item.service';

@Module({
  controllers: [],
  providers: [ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemModule {}
