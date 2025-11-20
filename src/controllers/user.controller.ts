import { Controller, Delete, Get, Query } from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import { FindUsersQueryFilters } from 'src/requests';
import { UserService } from 'src/services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers(@Query() filters: FindUsersQueryFilters) {
    return this.userService.findAll(filters);
  }

  @Delete()
  @IsNumberString()
  async deleteUser(@Query('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
