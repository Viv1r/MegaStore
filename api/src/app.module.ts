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

@Module({
  imports: [],
  controllers: [AppController, ProductsController, RegisterController, CategoriesController, TokenAuthController, LoginController, LogoutController, PurchaseController, UsersController],
  providers: [SqlService, UsersService, PurchasesService, ProductsService],
})
export class AppModule {};