import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { SqlService } from './sql/sql.service';
import { RegisterController } from './register/register.controller';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, RegisterController, CategoriesController],
  providers: [AppService, SqlService],
})
export class AppModule {};