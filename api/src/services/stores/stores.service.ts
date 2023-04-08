import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { SqlService } from "../sql/sql.service";

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

    async createStore(ownerID: number, data: any): Promise<any> {
        if (!data.name || !ownerID) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        let newStore: any;
        try {
            newStore = await this.stores.create({
                data: {
                    name: data.name,
                    owner_id: ownerID
                }
            });
        } catch {}

        if (newStore) {
            return { statusCode: 'ok', store: newStore };
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }

    async updateStore(storeID: number, data: any): Promise<any> {
        if (!storeID) {
            return { statusCode: 'error', statusMessage: 'Pleace specify correct id!' };
        }

        const newData = {
            name: data.name,
            owner_id: data.owner_id
        };

        let result: any;
        try {
            result = await this.stores.update({
                data: newData,
                where: {
                    id: Number(storeID)
                }
            });
        } catch {}

        if (result) {
            return { statusCode: 'ok' };
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }

    async getStoresShort(ownerID?: number): Promise<any> {
        let stores;
        try {
            stores = await this.stores.findMany({
                where: {
                    owner_id: ownerID
                }
            });
        } catch {}

        if (stores) {
            return { statusCode: 'ok', items: stores };
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }


    async getAllStores(data?: any): Promise<any> {
        const conditions = {
            include: {
                owner: {
                    select: {
                        email: true
                    }
                }
            },
            where: {
                AND: []
            }
        };

        if (data?.id) {
            conditions.where.AND.push({
                id: Number(data.id)
            });
        }

        if (data?.name) {
            conditions.where.AND.push({
                name: { includes: data.name }
            });
        }

        if (Array.isArray(data?.owner)) {
            conditions.where.AND.push({
                OR: data.owner.map(id => ({ owner_id: id }) )
            });
        }

        const result = await this.stores.findMany(conditions);

        return result.map((item: any) => {
            item.owner_email = item.owner?.email;
            delete item.owner;
            return item;
        });
    }

    public async getOneStore(storeID: number): Promise<any> {
        if (!Number(storeID)) return { statusCode: 'error', statusMessage: 'Specify correct id!' };

        let store;
        try {
            store = await this.stores.findFirst({
                where: {
                    id: Number(storeID)
                }
            });
        } catch {}

        if (store) {
            return store;
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }

    // Проверка, имеет ли юзер доступ к редактированию товаров заданных магазинов
    public async checkAccess(userID: number, stores: number[]): Promise<boolean> {
        const userStores = await this.storesOfUser(userID);
        return stores.every(id => userStores.includes(id));
    }
}
