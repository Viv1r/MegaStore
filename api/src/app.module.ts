import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { UsersController } from './controllers/users/users.controller';
import { CrmController } from './controllers/crm/crm.controller';
import { StoresService } from './services/stores/stores.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, RegisterController, CategoriesController, TokenAuthController, LoginController, LogoutController, PurchaseController, UsersController, CrmController],
  providers: [SqlService, UsersService, PurchasesService, ProductsService, StoresService],
})
export class AppModule {};