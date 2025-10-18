import {Body, Controller, Delete, Get, HttpException, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {UserGuard} from "../../../guards/user/user.guard";
import {Decimal} from "@prisma/client/runtime";
import { Product } from "../types/Product";
import {UsersService} from "../../../services/users/users.service";
import {ProductsService} from "../../../services/products/products.service";
import {StoresService} from "../../../services/stores/stores.service";
import {SqlService} from "../../../services/sql/sql.service";
import {PicturesService} from "../../../services/pictures/pictures.service";

@Controller('crm/products')
export class ProductsCrmController {
    constructor(
        private sqlService: SqlService,
        private usersService: UsersService,
        private productsService: ProductsService,
        private storesService: StoresService,
        private picturesService: PicturesService
    ) {}

    private readonly products = this.sqlService.client.products;

    @UseGuards(UserGuard)
    @Post()
    async getProducts(@Req() request: any, @Query() query: any, @Body() body: any): Promise<any> {
        const user = request.user;
        return await this.productsService.getAll(user, query, body);
    }

    @UseGuards(UserGuard)
    @Post('create')
    async createProduct(@Req() request: any, @Body() body: any): Promise<any> {
        if (!body?.store_id) {
            throw new HttpException('Please specify the store!', 400);
        }

        // Проверка доступа к магазину
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [body.store_id]);
        if (!hasAccess) {
            throw new HttpException('No access to this store!', 400);
        }

        return await this.productsService.createProduct(body);
    }

    @UseGuards(UserGuard)
    @Post('update/:id')
    async updateProduct(@Req() request: any, @Body() body: any, @Param('id') id: number): Promise<any> {
        id = Number(id);
        if (isNaN(id)) {
            throw new HttpException('Specify correct id!', 400);
        }

        const target = await this.productsService.get(id);

        if (!target) {
            throw new HttpException('Product not found!', 400);
        }

        const targetStores = [target.store_id];
        if (body.store_id && (body.store_id != target.store_id)) {
            targetStores.push(body.store_id);
        }

        // Проверка доступа к магазину
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, targetStores);
        if (!hasAccess) {
            throw new HttpException('No access to this store!', 400);
        }

        return await this.productsService.updateProduct(id, body);
    }

    @UseGuards(UserGuard)
    @Post(':id/picture')
    async updatePicture(
        @Param('id') id: number,
        @Body() body: any,
        @Req() request: any
    ) {
        id = Number(id);
        if (isNaN(id)) {
            throw new HttpException('Please specify id!', 400);
        }
        if (!body.picture) {
            throw new HttpException('Please upload a picture!', 400);
        }

        const product = await this.productsService.get(id);

        if (!product) {
            throw new HttpException('Product not found!', 400);
        }

        // Проверка доступа к магазину
        if (!request.user?.is_admin) {
            const hasAccess = await this.storesService.checkAccess(request.user?.id, [product.store_id]);
            if (!hasAccess) {
                throw new HttpException('No access to this product!', 400);
            }
        }

        return await this.picturesService.addProductPicture(id, body.picture);
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async getProduct(@Param('id') id: number, @Req() request: any): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) {
            throw new HttpException('Please specify id', 400);
        }

        const product = await this.productsService.get(id);

        if (!product) {
            throw new HttpException('Product not found!', 400);
        }

        // Проверка доступа к магазину
        if (!request.user?.is_admin) {
            const hasAccess = await this.storesService.checkAccess(request.user?.id, [product.store_id]);
            if (!hasAccess) {
                throw new HttpException('No access to this product!', 400);
            }
        }

        try {
            product.attributes = JSON.parse(product.attributes.toString());
        } catch {
            product.attributes = null;
        }

        return { statusCode: 'ok', item: product };
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: number, @Req() request: any): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) {
            throw new HttpException('Please specify id', 400);
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
            throw new HttpException('Product not found!', 400);
        }

        // Проверка, владеет ли юзер магазином, товар которого он удаляет
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, [target.store_id]);
        if (!hasAccess) {
            throw new HttpException('No access to this product!', 400);
        }

        return await this.productsService.deleteProducts([targetID]);
    }


    @UseGuards(UserGuard)
    @Post('delete')
    async deleteMultipleProducts(@Body() productsList: number[], @Req() request: any): Promise<any> {
        if (!Array.isArray(productsList)) {
            throw new HttpException('Please specify products!', 400);
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
            throw new HttpException('No products found!', 400);
        }

        const targetStores = [...new Set(target.map(item => item.store_id))];

        // Проверка, владеет ли юзер магазином, товары которого он удаляет
        const hasAccess = request.user?.is_admin
            || await this.storesService.checkAccess(request.user?.id, targetStores);
        if (!hasAccess) {
            throw new HttpException('No access to some products!', 400);
        }

        return await this.productsService.deleteProducts(target.map(item => item.id));
    }
}
