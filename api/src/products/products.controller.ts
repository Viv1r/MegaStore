/* eslint-disable prettier/prettier */
import { Controller, Req, Res, Get, Post, Body, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from '../app.service';
import { SqlService } from 'src/sql/sql.service';
import { resourceLimits } from 'worker_threads';

import fs from 'fs';
import { Decimal } from '@prisma/client/runtime';

interface Store {
    title: string
}

interface Product {
    id: number,
    title: string,
    description?: string,
    price: Decimal,
    picture?: string,
    store?: Store
}

const mainFolder = './dist/public/';
const itemsFolder = 'assets/items';

@Controller('products')
export class ProductsController {
    constructor(private readonly sqlService: SqlService) {}

    @Get()
    async getProducts(@Param('count') count: string): Promise<object> {
        const result: Product[] = await this.sqlService.client.products.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                store: {
                    select: {
                        title: true
                    }
                }
            },
            take: Number(count) || 10
        });
        
        if (result) {
            for (const elem of result) {
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

    @Get('/:id')
    async getProduct(@Param() params: { id: number }): Promise<object> {
        const result: Product[] = await this.sqlService.client.products.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                store: {
                    select: {
                        title: true
                    }
                }
            },
            where: {
                id: Number(params.id) || 0
            }
        });
        return result;
    }

	@Post('/create')
	async createProduct(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<object> {
		const token = request.cookies['token'];
		if (!token) {
			return { statusCode: 'error', statusMessage: 'bad token!' };
		}
		return { token: token };
	}
}
