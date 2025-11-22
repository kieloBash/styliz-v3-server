import { Module } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { CustomerController } from './controllers/customer.controller';
import { InvoiceController } from './controllers/invoice.controller';
import { ItemCategoryController } from './controllers/item-category.controller';
import { ItemController } from './controllers/item.controller';
import { PlatformController } from './controllers/platform.controller';
import { ShiftController } from './controllers/shift.controller';
import { UserController } from './controllers/user.controller';
import { CustomerModule } from './modules/customer.module';
import { InvoiceModule } from './modules/invoice.module';
import { ItemCategoryModule } from './modules/item-category.module';
import { ItemModule } from './modules/item.module';
import { PlatformModule } from './modules/platform.module';
import { ShiftModule } from './modules/shift.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    UserModule,
    ShiftModule,
    ItemCategoryModule,
    ItemModule,
    PlatformModule,
    CustomerModule,
    InvoiceModule,
  ],
  controllers: [
    AuthController,
    UserController,
    ShiftController,
    ItemCategoryController,
    ItemController,
    PlatformController,
    CustomerController,
    InvoiceController,
  ],
  providers: [],
})
export class AppModule {}
