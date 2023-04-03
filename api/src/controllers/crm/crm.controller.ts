import {Body, Controller, Delete, Get, Post, Param, Query, UseGuards, Req} from '@nestjs/common';
import {SqlService} from "../../services/sql/sql.service";
import {ProductsService} from "../../services/products/products.service";
import {Decimal} from "@prisma/client/runtime";
import {UserGuard} from "../../guards/user/user.guard";
import {UsersService} from "../../services/users/users.service";
import {StoresService} from "../../services/stores/stores.service";

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
    constructor(
        private sqlService: SqlService,
        private usersService: UsersService,
        private productsService: ProductsService,
        private storesService: StoresService
    ) {}

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

    @UseGuards(UserGuard)
    @Post('products/create')
    async createProduct(@Req() request: any, @Body() body: any): Promise<any> {
        if (!body?.store_id) {
            return { statusCode: 'error', statusMessage: 'Please specify the store!' };
        }

        // Проверка доступа к магазину
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [body.store_id]);
        if (!hasAccess) {
            return { statusCode: 'error', statusMessage: 'No access to this store!' };
        }

        return await this.productsService.createProduct(body);
    }

    @UseGuards(UserGuard)
    @Post('products/update/:id')
    async updateProduct(@Req() request: any, @Body() body: any, @Param('id') id: number): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) return { statusCode: 'error', statusMessage: 'Specify correct id!' };

        const target = await this.products.findFirst({
            select: { store_id: true },
            where: {
                id: targetID,
                is_deleted: false
            }
        });

        if (!target) {
            return { statusCode: 'error', statusMessage: 'Product not found!' };
        }

        // Проверка доступа к магазину
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [target.store_id]);
        if (!hasAccess) {
            return { statusCode: 'error', statusMessage: 'No access to this store!' };
        }

        return await this.productsService.updateProduct(targetID, body);
    }

    @UseGuards(UserGuard)
    @Get('products/:id')
    async getProduct(@Param('id') id: number, @Req() request: any): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) {
            return { statusCode: 'error', statusMessage: 'Please specify id' };
        }

        const product = await this.products.findFirst({
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                store: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                id: targetID,
                is_deleted: false
            }
        });

        if (!product) {
            return { statusCode: 'error', statusMessage: 'Product not found!' };
        }

        // Проверка доступа к магазину
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [product.store_id]);
        if (!hasAccess) {
            return { statusCode: 'error', statusMessage: 'No access to this product!' };
        }

        try {
            product.attributes = JSON.parse(product.attributes.toString());
        } catch {
            product.attributes = null;
        }

        return product;
    }

    @UseGuards(UserGuard)
    @Delete('products/:id')
    async deleteProduct(@Param('id') id: number, @Req() request: any): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) {
            return { statusCode: 'error', statusMessage: 'Please specify id' };
        }

        const target = await this.products.findFirst({
            select: {
                store_id: true
            },
            where: {
                id: targetID,
                is_deleted: false
            }
        });

        if (!target) {
            return { statusCode: 'error', statusMessage: 'Product not found!' };
        }

        // Проверка, владеет ли юзер магазином, товар которого он удаляет
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [target.store_id]);
        if (!hasAccess) {
            return { statusCode: 'error', statusMessage: 'No access to this product!' };
        }

        return await this.productsService.deleteProducts([targetID]);
    }


    @UseGuards(UserGuard)
    @Post('products/delete')
    async deleteMultipleProducts(@Body() productsList: number[], @Req() request: any): Promise<any> {
        if (!Array.isArray(productsList)) {
            return { statusCode: 'error', statusMessage: 'Please specify products!' };
        }

        const productsQuery = productsList.map(id => { return { id: Number(id) } });

        const target = await this.products.findMany({
            select: {
                id: true,
                store_id: true
            },
            where: {
                OR: productsQuery,
                is_deleted: false
            }
        });

        if (!target.length) {
            return { statusCode: 'error', statusMessage: 'No products found!' };
        }

        const targetStores = [...new Set(target.map(item => item.store_id))];

        // Проверка, владеет ли юзер магазином, товары которого он удаляет
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, targetStores);
        if (!hasAccess) {
            return { statusCode: 'error', statusMessage: 'No access to some products!' };
        }

        return await this.productsService.deleteProducts(target.map(item => item.id));
    }
}
