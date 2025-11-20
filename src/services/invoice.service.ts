import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginateService } from 'src/base/base-paginate.service';
import { PrismaService } from 'src/common/prisma.service';
import { CreateInvoiceDto } from 'src/requests/create';
import { UpdateInvoiceDto } from 'src/requests/update';
import { Invoice, Prisma } from '../../generated/prisma';

@Injectable()
export class InvoiceService extends BasePaginateService<
  Invoice,
  Prisma.InvoiceWhereInput,
  Prisma.InvoiceOrderByWithAggregationInput,
  Prisma.InvoiceInclude,
  Prisma.InvoiceSelect
> {
  constructor(private prisma: PrismaService) {
    super();
    this.model = this.prisma.invoice;
  }

  async create(data: CreateInvoiceDto) {
    const { customerId, sellerId, platformId, items, ...rest } = data;

    return this.prisma.invoice.create({
      data: {
        ...rest,
        customer: { connect: { id: customerId } },
        seller: { connect: { id: sellerId } },
        platform: { connect: { id: platformId } },
        items: items
          ? {
              create: items.map((item) => ({
                price: item.price,
                category: { connect: { id: item.categoryId } },
                status: item.status || 'COMPLETED',
              })),
            }
          : undefined,
      },
      include: {
        customer: true,
        seller: true,
        platform: true,
        items: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.paginate({
      include: {
        customer: true,
        items: true,
      },
    });
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async update(id: number, data: UpdateInvoiceDto) {
    const exists = await this.prisma.invoice.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    const { customerId, platformId, sellerId, items, ...rest } = data;

    return this.prisma.invoice.update({
      where: { id },
      data: {
        ...rest,
        customer: customerId ? { connect: { id: customerId } } : undefined,
        platform: platformId ? { connect: { id: platformId } } : undefined,
        seller: sellerId ? { connect: { id: sellerId } } : undefined,
        items: items
          ? {
              create: items.map((item) => ({
                price: item.price,
                category: { connect: { id: item.categoryId } },
                status: item.status || 'COMPLETED',
              })),
            }
          : undefined,
      },
      include: {
        customer: true,
        seller: true,
        platform: true,
        items: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.invoice.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
