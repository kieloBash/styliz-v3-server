import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PlatformCreateInput) {
    return this.prisma.platform.create({ data });
  }

  async findAll() {
    return this.prisma.platform.findMany();
  }

  async findOne(id: number) {
    const platform = await this.prisma.platform.findUnique({
      where: { id },
    });

    if (!platform) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }

    return platform;
  }

  async update(id: number, data: Prisma.PlatformUpdateInput) {
    const exists = await this.prisma.platform.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }

    return this.prisma.platform.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.platform.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }

    return this.prisma.platform.delete({
      where: { id },
    });
  }
}
