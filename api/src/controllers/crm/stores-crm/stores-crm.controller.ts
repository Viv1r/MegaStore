import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { UserGuard } from "../../../guards/user/user.guard";
import { StoresService } from "../../../services/stores/stores.service";

@Controller('crm/stores')
export class StoresCrmController {
    constructor(private storesService: StoresService) {}

    @UseGuards(UserGuard)
    @Post()
    async getAllStores(@Req() request: any, @Body() body: any): Promise<any> {
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
    @Get('short')
    async getStoresShort(@Req() request: any): Promise<any> {
        if (request.user.is_admin) {
            return await this.storesService.getStoresShort(); // Админ получает все магазины, обычный юзер - только свои
        }
        return await this.storesService.getStoresShort(request.user.id);
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async getOneStore(@Param('id') storeID: number, @Req() request: any): Promise<any> {
        if (!request.user.is_admin) {
            const check = this.storesService.checkAccess(request.user.id, [storeID]);
            if (!check) return { statusCode: 'error', statusMessage: 'No access to this store!' };
        }
        return await this.storesService.getOneStore(storeID);
    }

    @UseGuards(UserGuard)
    @Post('update/:id')
    async updateStore(@Param('id') storeID: number, @Req() request: any, @Body() body: any): Promise<any> {
        if (!request.user.is_admin) {
            delete body.owner_id; // Менять владельца магазина может только админ

            const check = this.storesService.checkAccess(request.user.id, [storeID]);
            if (!check) {
                return { statusCode: 'error', statusMessage: 'No access to this store!' };
            }
        }
        return await this.storesService.updateStore(storeID, body);
    }

    @UseGuards(UserGuard)
    @Post('create')
    async createStore(@Req() request: any, @Body() body: any): Promise<any> {
        const userID = request.user.id;
        if (!request.user.is_admin) {
            delete body.owner_id; // Создать магазин для другого юзера может только админ
        }
        return await this.storesService.createStore(userID, body);
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteStore(@Req() request: any, @Param('id') storeID: number): Promise<any> {
        storeID = Number(storeID);
        if (isNaN(storeID)) {
            return { statusCode: 'error', statusMessage: 'Wrong id specified!' };
        }
        const user = request.user;

        if (!user.is_admin) {
            const check = this.storesService.checkAccess(user.id, [storeID]);
            if (!check) return { statusCode: 'error', statusMessage: 'No access!' };
        }
        return await this.storesService.deleteStore(storeID);
    }
}
