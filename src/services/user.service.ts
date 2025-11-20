import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { BasePaginateService } from 'src/base/base-paginate.service';
import { PrismaService } from 'src/common/prisma.service';
import { FindUsersQueryFilters } from 'src/requests/find.users';

@Injectable()
export class UserService extends BasePaginateService<
  User,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithAggregationInput,
  any,
  Prisma.UserSelect
> {
  constructor(private readonly prisma: PrismaService) {
    super();
    this.model = this.prisma.user;
  }

  async getAllUsers(filters: FindUsersQueryFilters) {
    return this.paginate(filters);
  }
}
