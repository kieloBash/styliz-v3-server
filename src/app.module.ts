import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
