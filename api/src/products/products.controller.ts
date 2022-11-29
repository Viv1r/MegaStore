import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service';
import { SqlService } from 'src/sql/sql.service';
import { resourceLimits } from 'worker_threads';

import fs from 'fs';
import { Decimal } from '@prisma/client/runtime';

interface Store {
    title: String
}

interface Product {
    id: Number,
    title: String,
    description: String,
    price: Decimal,
    picture?: String,
    store?: Store
}

const mainFolder = './dist/public/';
const itemsFolder = 'assets/items';

@Controller('products')
export class ProductsController {
    constructor(private readonly sqlService: SqlService) {}

    @Post()
    async productsPost(@Body() body) {
        const result: Product[] = await this.sqlService.client.products.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                store: {
                    select: {
                        title: true
                    }
                }
            },
            take: body.count || 10
        });
        
        if (result) {
            for (let elem of result) {
                try {
                    const regex = /^.*\.(jpg|png|jpeg)$/;
                    const folder = itemsFolder + `/${elem.id}/`;

                    fs.readdirSync(mainFolder + folder).some(file => {
                        if (regex.test(file)) {
                            elem.picture = folder + file;
                            return true;
                        }
                        return false;
                    });
                } catch (err) {
                    console.log(err);
                }
            }

            return { statusCode: 'ok', products: result };
        }
    }
}
