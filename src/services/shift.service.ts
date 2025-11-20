import { Injectable, NotFoundException } from '@nestjs/common';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { Prisma, Shift } from 'generated/prisma';
import { ErrorException } from 'src/common/exception/error.exception';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async createShift(data: Prisma.ShiftCreateInput): Promise<Shift> {
    try {
      return this.prisma.shift.create({ data });
    } catch (error) {
      throw new ErrorException(error.message);
    }
  }

  async updateShift(
    shiftId: number,
    data: Prisma.ShiftUpdateInput,
  ): Promise<Shift> {
    try {
      return await this.prisma.shift.update({ where: { id: shiftId }, data });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Shift with ID ${shiftId} not found`);
      }
      throw new ErrorException(error.message);
    }
  }

  async deleteShift(shiftId: number): Promise<Shift> {
    try {
      return await this.prisma.shift.delete({ where: { id: shiftId } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Shift with ID ${shiftId} not found`);
      }
      throw new ErrorException(error.message);
    }
  }

  async getWeeklyShifts(date: Date): Promise<Shift[]> {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(date, { weekStartsOn: 1 }); // Sunday

    return this.prisma.shift.findMany({
      where: { startTime: { gte: start, lte: end } },
      include: { user: true },
      orderBy: { startTime: 'asc' },
    });
  }

  async getMonthlyShifts(year: number, month: number): Promise<Shift[]> {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(start);

    return this.prisma.shift.findMany({
      where: { startTime: { gte: start, lte: end } },
      include: { user: true },
      orderBy: { startTime: 'asc' },
    });
  }

  async assignUserToShift(shiftId: number, userId: number): Promise<Shift> {
    try {
      return await this.prisma.shift.update({
        where: { id: shiftId },
        data: { userId },
        include: { user: true },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Shift or user not found`);
      }
      throw new ErrorException(error.message);
    }
  }
}
