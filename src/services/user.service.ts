import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from 'generated/prisma';
import { BasePaginateService } from 'src/base/base-paginate.service';
import { PrismaService } from 'src/common/prisma.service';
import { RegisterUserRequestDTO } from 'src/requests';
import { FindUsersQueryFilters } from 'src/requests/find.users';
@Injectable()
export class UserService extends BasePaginateService<
  User,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithAggregationInput,
  Prisma.UserInclude,
  Prisma.UserSelect
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super();
    this.model = this.prisma.user;
  }

  async findAll(filters: FindUsersQueryFilters) {
    return this.paginate({ ...filters, include: { userProfile: true } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.model.create({ data });
  }

  async registerUser(data: RegisterUserRequestDTO): Promise<User> {
    try {
      const { avatarUrl, color, rate, ...userDetails } = data;
      const hashedPassword = await bcrypt.hash(data.password as string, 10);

      return await this.model.create({
        data: {
          ...userDetails,
          password: hashedPassword,
          userProfile: {
            create: {
              avatarUrl,
              color,
              rate,
            },
          },
        },
        include: {
          userProfile: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Unique constraint failed
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.model.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { user, token };
  }

  async deleteUser(userId: number): Promise<User> {
    try {
      return await this.model.delete({
        where: { id: userId },
      });
    } catch (error: any) {
      // Handle case where user does not exist
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // P2025 = "Record to delete does not exist."
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      throw error;
    }
  }
}
