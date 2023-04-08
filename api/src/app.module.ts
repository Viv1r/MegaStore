import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { RegisterController } from './controllers/register/register.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { TokenAuthController } from './controllers/token-auth/token-auth.controller';
import { SqlService } from 'src/services/sql/sql.service';
import { LoginController } from './controllers/login/login.controller';
import { LogoutController } from './controllers/logout/logout.controller';
import { PurchaseController } from './controllers/purchase/purchase.controller';
import { UsersService } from './services/users/users.service';
import { PurchasesService } from './services/purchases/purchases.service';
import { ProductsService } from './services/products/products.service';
import { UsersController } from './controllers/crm/users-crm/users.controller';
import { CrmController } from './controllers/crm/crm.controller';
import { StoresService } from './services/stores/stores.service';
import { ProductsCrmController } from './controllers/crm/products-crm/products-crm.controller';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    RegisterController,
    CategoriesController,
    TokenAuthController,
    LoginController,
    LogoutController,
    PurchaseController,
    UsersController,
    CrmController,
    ProductsCrmController
  ],
  providers: [
    SqlService,
    UsersService,
    PurchasesService,
    ProductsService,
    StoresService
  ]
})
export class AppModule {}