import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ShiftController } from './controllers/shift.controller';
import { UserController } from './controllers/user.controller';
import { ShiftModule } from './modules/shift.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, ShiftModule],
  controllers: [AuthController, UserController, ShiftController],
  providers: [],
})
export class AppModule {}
