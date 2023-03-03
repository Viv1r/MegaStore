import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { RegisterController } from './controllers/register/register.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { TokenAuthController } from './controllers/token-auth/token-auth.controller';
import { SqlService } from 'src/services/sql/sql.service';
import { LoginController } from './controllers/login/login.controller';
import { LogoutController } from './controllers/logout/logout.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, RegisterController, CategoriesController, TokenAuthController, LoginController, LogoutController],
  providers: [AppService, SqlService],
})
export class AppModule {};