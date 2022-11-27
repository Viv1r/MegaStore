import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { SqlService } from './sql/sql.service';
import { ProductDetailsController } from './product-details/product-details.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, ProductDetailsController],
  providers: [AppService, SqlService],
})
export class AppModule {};