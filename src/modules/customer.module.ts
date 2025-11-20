import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CustomerService } from 'src/services/customer.service';

@Module({
  controllers: [],
  providers: [CustomerService, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
