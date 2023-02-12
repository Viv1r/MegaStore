import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { SqlService } from './sql/sql.service';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, RegisterController],
  providers: [AppService, SqlService],
})
export class AppModule {};