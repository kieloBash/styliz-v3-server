import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
