import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { jwtConstants } from 'src/common/constants/jwt';
import { PrismaService } from 'src/common/prisma.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiration as any },
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
