import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { InvoiceService } from 'src/services/invoice.service';

@Module({
  controllers: [],
  providers: [InvoiceService, PrismaService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
