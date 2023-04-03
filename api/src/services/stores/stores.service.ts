import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {SqlService} from "../sql/sql.service";

@Injectable()
export class StoresService {
    constructor(private sqlService: SqlService, private usersService: UsersService) {}

    private stores = this.sqlService.client.stores;

    async storesOfUser(userID?: number): Promise<number[]> {
        if (!userID) return [];

        const result = await this.stores.findMany({
            select: {
                id: true
            },
            where: {
                owner_id: userID
            }
        });

        if (result?.length) {
            return result.map(item => item.id);
        }
        return [];
    }

    // Проверка, имеет ли юзер доступ к редактированию товаров заданных магазинов
    public async checkAccess(userID: number, stores: number[]): Promise<boolean> {
        const userStores = await this.storesOfUser(userID);
        return stores.every(id => userStores.includes(id));
    }
}
