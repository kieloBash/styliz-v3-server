import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
