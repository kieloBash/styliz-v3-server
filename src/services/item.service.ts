import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateItemDto } from 'src/requests/create';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateItemDto) {
    const { categoryId, invoiceId, price, status } = data;
    return this.prisma.item.create({
      data: {
        price,
        status,
        category: { connect: { id: categoryId } },
        invoice: { connect: { id: invoiceId } },
      },
    });
  }

  async findAll() {
    return this.prisma.item.findMany({
      include: {
        category: true,
        invoice: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        invoice: true,
      },
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async update(id: number, data: Prisma.ItemUpdateInput) {
    const exists = await this.prisma.item.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.item.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return this.prisma.item.delete({
      where: { id },
    });
  }
}
