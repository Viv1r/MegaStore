import {Body, Controller, Delete, Get, Post, Param, Query, UseGuards, Req, Redirect} from '@nestjs/common';
import {SqlService} from "../../services/sql/sql.service";
import {ProductsService} from "../../services/products/products.service";
import {Decimal} from "@prisma/client/runtime";
import {UserGuard} from "../../guards/user/user.guard";
import {UsersService} from "../../services/users/users.service";
import {StoresService} from "../../services/stores/stores.service";
import {AdminGuard} from "../../guards/admin/admin.guard";

@Controller('crm')
export class CrmController {
    constructor(private sqlService: SqlService, private storesService: StoresService) {}

    private readonly categories = this.sqlService.client.categories;

    @Redirect("https://crm.alymoff.ru", 301)
    @Get()
    goToCRM() {}

    @UseGuards(UserGuard)
    @Get('stores/short')
    async getStoresShort(@Req() request: any): Promise<any> {
        if (request.user?.is_admin) {
            return await this.storesService.getStoresShort(); // Админ получает все магазины, обычный юзер - только свои
        }
        return await this.storesService.getStoresShort(request.user.id);
    }

    @UseGuards(UserGuard)
    @Post('stores')
    async getStores(@Req() request: any, @Body() body: any): Promise<any> {
        if (!request.user.is_admin) {
            body.owner = [request.user.id]; // Если юзер не админ, то будет видеть только свои магазины
        }

        const result = await this.storesService.getAllStores(body);
        if (result) {
            return { statusCode: 'ok', items: result };
        }
        return { statusCode: 'error' };
    }

    @UseGuards(UserGuard)
    @Get('stores/:id')
    async getOneStore(@Param('id') storeID: number, @Req() request: any): Promise<any> {
        if (!request.user.is_admin) {
            const check = this.storesService.checkAccess(request.user.id, [storeID]);
            if (!check) return { statusCode: 'error', statusMessage: 'No access to this store!' };
        }
        return await this.storesService.getOneStore(storeID);
    }

    @UseGuards(UserGuard)
    @Post('stores/:id')
    async updateStore(@Param('id') storeID: number, @Req() request: any, @Body() body: any): Promise<any> {
        if (!request.user.is_admin) {
            delete body.owner_id; // Менять владельца магазина может только админ

            const check = this.storesService.checkAccess(request.user.id, [storeID]);
            if (!check) return { statusCode: 'error', statusMessage: 'No access to this store!' };
        }
        return await this.storesService.updateStore(storeID, body);
    }

    @UseGuards(UserGuard)
    @Post('stores/create')
    async createStore(@Req() request: any, @Body() body: any): Promise<any> {
        const userID = request.user?.id;
        return this.storesService.createStore(userID, body);
    }

    @UseGuards(AdminGuard)
    @Get('categories')
    async getCategories() {
        const data = await this.categories.findMany({
            include: {
                _count: {
                    select: { products: true }
                },
            },
            where: {
                is_deleted: false
            }
        });
        if (data) {
            const items = data.map((item: any) => {
                item.products_count = item._count?.products ?? 0;
                delete item._count;
                return item;
            });
            return {statusCode: 'ok', items: items};
        }
    }

    @UseGuards(AdminGuard)
    @Delete('categories/:id')
    async deleteCategory(@Param() id: number) {
        return true;
    }
}
