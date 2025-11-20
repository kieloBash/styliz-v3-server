import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class ItemCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ItemCategoryCreateInput) {
    return this.prisma.itemCategory.create({ data });
  }

  async findAll() {
    return this.prisma.itemCategory.findMany({
      include: { items: true },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.itemCategory.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!category) {
      throw new NotFoundException(`ItemCategory with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, data: Prisma.ItemCategoryUpdateInput) {
    const exists = await this.prisma.itemCategory.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`ItemCategory with ID ${id} not found`);
    }

    return this.prisma.itemCategory.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.itemCategory.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`ItemCategory with ID ${id} not found`);
    }

    return this.prisma.itemCategory.delete({
      where: { id },
    });
  }
}
