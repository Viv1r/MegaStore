/* eslint-disable prettier/prettier */
import { Controller, Req, Res, Get, Post, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';

import fs from 'fs';
import { Decimal } from '@prisma/client/runtime';

interface Store {
    title: string
}

interface Category {
    name: string
}

interface Product {
    id: number,
    title: string,
    description?: string,
    price: Decimal,
    attributes?: string | object,
    count_available?: number,
    picture?: string,
    store?: Store,
    category?: Category
}

const mainFolder = './dist/public/';
const itemsFolder = 'api/assets/items';

@Controller('products')
export class ProductsController {
    constructor(private readonly sqlService: SqlService) {}

    private readonly products = this.sqlService.client.products;

    private async parseImage(productId: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                const regex = /^.*\.(jpg|png|jpeg)$/;
                const folder = itemsFolder + `/${productId}/`;
    
                const fileCheck = fs.readdirSync(mainFolder + folder).some(file => {
                    if (regex.test(file)) {
                        resolve(folder + file);
                        return true;
                    }
                    return false;
                });

                if (!fileCheck) {
                    resolve(null);
                }
            } catch {
                resolve(null);
            }
        })
    }

    @Get()
    async getProducts(@Param('count') count: string): Promise<object> {
        const result: Product[] = await this.products.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                store: {
                    select: {
                        title: true
                    }
                },
                count_available: true
            },
            take: Number(count) || 10
        });
        
        if (result) {
            for (const elem of result) {
                const parsedImg = await this.parseImage(elem.id);
                if (parsedImg) {
                    elem.picture = parsedImg;
                }
            }

            return { statusCode: 'ok', products: result };
        }
    }

    @Get('/catalog')
    async getCatalog(): Promise<object> {
        const result: Product[] = await this.products.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                description: true,
                store: {
                    select: {
                        title: true
                    }
                },
                count_available: true
            }
        });
        
        if (result) {
            for (const elem of result) {
                const parsedImg = await this.parseImage(elem.id);
                if (parsedImg) {
                    elem.picture = parsedImg;
                }
            }

            return { statusCode: 'ok', products: result };
        }
    }

    @Get('/:id')
    async getProduct(@Param() params: { id: number }): Promise<object> {
        const targetID = Number(params.id);
        if (!targetID) {
            return { statusCode: 'error', statusMessage: 'Wrong ID specified' }
        }

        const result: Product = await this.products.findFirst({
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                attributes: true,
                count_available: true,
                store: {
                    select: {
                        title: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                id: Number(params.id) || 0
            }
        });

        if (result) {
            if (result.attributes) {
                result.attributes = JSON.parse(result.attributes.toString()) || {};
            }
            result.picture = await this.parseImage(result.id);

            return { statusCode: 'ok', product: result };
        }
        return { statusCode: 'error', statusMessage: 'Could not get product' };
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
