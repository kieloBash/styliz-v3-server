import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ShiftService } from 'src/services/shift.service';

@Module({
  imports: [],
  providers: [ShiftService, PrismaService],
  exports: [ShiftService],
})
export class ShiftModule {}
