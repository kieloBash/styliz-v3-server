import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Shift } from 'generated/prisma';
import { CreateShiftDto } from 'src/requests/create';
import { GetMonthlyShiftsDto } from 'src/requests/find';
import { UpdateShiftDto } from 'src/requests/update';

import { ShiftService } from 'src/services/shift.service';

@Controller('api/shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  /** Create a new shift */
  @Post()
  async createShift(@Body() dto: CreateShiftDto): Promise<Shift> {
    const data = {
      user: { connect: { id: dto.userId } },
      startTime: new Date(dto.startTime),
      endTime: dto.endTime ? new Date(dto.endTime) : undefined,
      type: dto.type,
    };
    return this.shiftService.createShift(data);
  }

  /** Update a shift */
  @Patch(':id')
  async updateShift(
    @Param('id', ParseIntPipe) shiftId: number,
    @Body() dto: UpdateShiftDto,
  ): Promise<Shift> {
    const data: any = {};
    if (dto.userId) data.userId = dto.userId;
    if (dto.startTime) data.startTime = new Date(dto.startTime);
    if (dto.endTime) data.endTime = new Date(dto.endTime);
    if (dto.type) data.type = dto.type;

    return this.shiftService.updateShift(shiftId, data);
  }

  /** Delete a shift */
  @Delete(':id')
  async deleteShift(
    @Param('id', ParseIntPipe) shiftId: number,
  ): Promise<Shift> {
    return this.shiftService.deleteShift(shiftId);
  }

  /** Get weekly shifts for a given date (query param: ?date=2025-11-20) */
  @Get('weekly')
  async getWeeklyShifts(@Query('date') dateString: string): Promise<Shift[]> {
    const date = dateString ? new Date(dateString) : new Date();
    return this.shiftService.getWeeklyShifts(date);
  }

  /** Get monthly shifts for a given month/year */
  @Get('monthly')
  async getMonthlyShifts(
    @Query() query: GetMonthlyShiftsDto,
  ): Promise<Shift[]> {
    return this.shiftService.getMonthlyShifts(query.year, query.month);
  }

  /** Assign or change user for a shift */
  @Patch(':id/assign/:userId')
  async assignUserToShift(
    @Param('id', ParseIntPipe) shiftId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Shift> {
    return this.shiftService.assignUserToShift(shiftId, userId);
  }
}
