import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { SqlService } from 'src/sql/sql.service';
import { resourceLimits } from 'worker_threads';

@Controller('products')
export class ProductsController {
    constructor(private readonly sqlService: SqlService) {}

    @Get()
    productsGet(): Object {
        return 'Use POST instead';
    }

    @Post()
    async productsPost(@Body() body) {
        const result = await this.sqlService.client.products.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                store: {
                    select: {
                        title: true
                    }
                }
            },
            take: body.count || 10
        });
        console.log(result);
        return result;
    }
}
