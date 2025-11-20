import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PlatformService } from 'src/services/platform.service';

@Module({
  controllers: [],
  providers: [PlatformService, PrismaService],
  exports: [PlatformService],
})
export class PlatformModule {}
