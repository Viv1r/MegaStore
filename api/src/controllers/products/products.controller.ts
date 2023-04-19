/* eslint-disable prettier/prettier */
import { Controller, Req, Res, Get, Post, Param, Query, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';

import fs from 'fs';
import { Decimal } from '@prisma/client/runtime';
import {PurchasesService} from "../../services/purchases/purchases.service";
import {ProductsService} from "../../services/products/products.service";
import {UserGuard} from "../../guards/user/user.guard";
import {AdminGuard} from "../../guards/admin/admin.guard";

interface Store {
    name: string
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

@Controller('products')
export class ProductsController {
    constructor(private sqlService: SqlService, private productsService: ProductsService) {}

    private readonly products = this.sqlService.client.products;
    private readonly productsPerPage = 5;

    @Get()
    async getProducts(@Query('count') count?: number): Promise<object> {
        const result: Product[] = await this.products.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                store: {
                    select: {
                        name: true
                    }
                },
                count_available: true
            },
            where: {
                is_deleted: false
            },
            take: Number(count) || 10
        });
        
        if (result) {
            for (const elem of result) {
                const parsedImg = await this.productsService.parseImage(elem.id);
                if (parsedImg) {
                    elem.picture = parsedImg;
                }
            }

            return { statusCode: 'ok', products: result };
        }
    }

    @Post('/catalog')
    async getCatalog(
        @Query('offset') offset: number,
        @Query('count') count: number,
        @Body() body: any
    ): Promise<object> {
        const conditions: any = {
            is_deleted: false,
            title: {
                contains: body.title ?? ''
            },
            description: {
                contains: body.description ?? ''
            },
            price: {}
        };

        if (typeof body.category === 'number') {
            conditions.category_id = body.category;
        }

        if (typeof body.price?.min === 'number') {
            conditions.price.gte = body.price.min;
        }

        if (typeof body.price?.max === 'number') {
            conditions.price.lte = body.price.max;
        }

        let result: Product[];
        try {
            result = await this.products.findMany({
                select: {
                    id: true,
                    title: true,
                    price: true,
                    price_postfix: true,
                    description: true,
                    count_available: true,
                    store: {
                        select: { name: true }
                    },
                    category: {
                        select: { name: true }
                    }
                },
                where: conditions,
                take: Number(count) || this.productsPerPage,
                skip: Number(offset) || 0
            });
        } catch {}

        if (!result?.length) {
            return { statusCode: 'ok', products: [], end: true };
        }

        const lastOne = await this.products.findFirst({
            select: {
                id: true
            },
            where: conditions,
            take: -1
        });
        
        if (result) {
            for (const elem of result) {
                const parsedImg = await this.productsService.parseImage(elem.id);
                if (parsedImg) {
                    elem.picture = parsedImg;
                }
            }

            const response = { statusCode: 'ok', products: result, end: false };
            if (lastOne.id <= result[result.length-1].id) {
                response.end = true; // Сигнал клиенту, что больше грузить нечего
            }

            return response;
        }
        return { statusCode: 'error', statusMessage: 'Try again' };
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
                price_postfix: true,
                attributes: true,
                count_available: true,
                store: {
                    select: {
                        name: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                id: Number(params.id) || 0,
                is_deleted: false
            }
        });

        if (result) {
            if (result.attributes) {
                try {
                    result.attributes = JSON.parse(result.attributes.toString());
                } catch {
                    result.attributes = {} as any;
                }
            }
            result.picture = await this.productsService.parseImage(result.id);

            return { statusCode: 'ok', product: result };
        }
        return { statusCode: 'error', statusMessage: 'Could not get product' };
    }
}
