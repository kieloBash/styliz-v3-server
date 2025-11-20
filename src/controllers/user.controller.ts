import { Controller, Get, Query } from '@nestjs/common';
import { FindUsersQueryFilters } from 'src/requests/find.users';
import { UserService } from 'src/services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test')
  async getTest(@Query() filters: FindUsersQueryFilters) {
    return this.userService.getAllUsers(filters);
  }
}
