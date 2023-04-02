import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {SqlService} from "../../services/sql/sql.service";
import {ProductsService} from "../../services/products/products.service";
import {Decimal} from "@prisma/client/runtime";
import {UserGuard} from "../../guards/user/user.guard";

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

@Controller('crm')
export class CrmController {
    constructor(private sqlService: SqlService) {}

    private readonly products = this.sqlService.client.products;
    private readonly stores = this.sqlService.client.stores;

    @UseGuards(UserGuard)
    @Get('/stores')
    async getStores(@Body() body: any): Promise<any> {
        const result = await this.stores.findMany({
            select: {
                id: true,
                name: true
            }
        });
        if (result) {
            return { statusCode: 'ok', stores: result };
        }
        return { statusCode: 'error' };
    }

    @UseGuards(UserGuard)
    @Post('/products')
    async getProducts(@Query() query: any, @Body() body: any): Promise<any> {
        let categoryQuery, storeQuery;

        if (Array.isArray(body?.category)) {
            categoryQuery = body.category.map(id => { return { category_id: id } });
        }
        if (Array.isArray(body?.store)) {
            storeQuery = body.store.map(id => { return { store_id: id } });
        }

        const count = Number(query?.count) || 10;
        let skip;
        if (query?.page > 1) {
            skip = Number(query.count) * (query.page - 1);
        }

        const requestParams = {
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                price_postfix: true,
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
                AND: []
            },
            take: count,
            skip: skip
        };

        if (categoryQuery?.length) {
            requestParams.where.AND.push({
                OR: categoryQuery
            });
        }

        if (storeQuery?.length) {
            requestParams.where.AND.push({
                OR: storeQuery
            });
        }

        if (body?.title) requestParams.where.AND.push({
            title: { contains: body.title }
        });

        if (body?.description) requestParams.where.AND.push({
            description: { contains: body.description }
        });

        if (body?.id) requestParams.where.AND.push({
            id: body.id
        });

        if (body?.id) requestParams.where.AND.push({
            id: body.id
        });

        const result: Product[] = await this.products.findMany(requestParams);

        if (result) {
            return { statusCode: 'ok', products: result };
        }
    }
}
