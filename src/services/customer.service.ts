import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CustomerCreateInput) {
    return this.prisma.customer.create({ data });
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: { invoices: true },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { invoices: true },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async update(id: number, data: Prisma.CustomerUpdateInput) {
    const exists = await this.prisma.customer.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.customer.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
