import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { SqlService } from "../sql/sql.service";

@Injectable()
export class StoresService {
    constructor(private sqlService: SqlService, private usersService: UsersService) {}

    private stores = this.sqlService.client.stores;
    private products = this.sqlService.client.products;

    async storesOfUser(userID?: number): Promise<number[]> {
        if (!userID) return [];

        const result = await this.stores.findMany({
            select: {
                id: true
            },
            where: {
                owner_id: userID,
                is_deleted: false
            }
        });

        if (result?.length) {
            return result.map(item => item.id);
        }
        return [];
    }

    async createStore(userID: number, data: any): Promise<any> {
        if (!data.name || !userID) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        let newStore: any;
        try {
            newStore = await this.stores.create({
                data: {
                    name: data.name,
                    owner_id: data.owner_id ?? userID
                }
            });
        } catch(e) {
            console.log(e);
        }

        if (newStore) {
            return { statusCode: 'ok', store: newStore };
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }

    async updateStore(storeID: number, data: any): Promise<any> {
        if (!storeID) {
            return { statusCode: 'error', statusMessage: 'Please specify correct id!' };
        }

        const newData = {
            name: data.name,
            owner_id: Number(data.owner_id)
        };

        let result: any;
        try {
            result = await this.stores.update({
                data: newData,
                where: {
                    id: storeID
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
                    owner_id: ownerID,
                    is_deleted: false
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
                },
                _count: {
                    select: {
                        products: true,
                        sales: true
                    }
                }
            },
            where: {
                is_deleted: false,
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
                name: { contains: data.name }
            });
        }

        if (Array.isArray(data?.owner)) {
            conditions.where.AND.push({
                OR: data.owner.map(id => ({ owner_id: id }) )
            });
        }

        let result;
        try {
            result = await this.stores.findMany(conditions);
        } catch {
            result = [];
        }

        return result.map((item: any) => {
            item.owner_email = item.owner?.email;
            delete item.owner;
            item.products_count = item._count.products;
            item.sales = item._count.sales;
            delete item._count;

            return item;
        });
    }

    public async getOneStore(storeID: number): Promise<any> {
        if (!Number(storeID)) return { statusCode: 'error', statusMessage: 'Specify correct id!' };

        let store;
        try {
            store = await this.stores.findFirst({
                where: {
                    id: Number(storeID),
                    is_deleted: false
                }
            });
        } catch {}

        if (store) {
            return store;
        }
        return { statusCode: 'error', statusMessage: 'Check your data!' };
    }

    public async deleteStore(storeID: number): Promise<any> {
        let deleteProducts;
        try {
            deleteProducts = await this.products.updateMany({
                data: {
                    is_deleted: true
                },
                where: {
                    store_id: storeID,
                    is_deleted: false
                }
            });
        } catch {}
        if (!deleteProducts) {
            return { statusCode: 'error', statusMessage: 'Could not delete!' };
        }

        let deleteStore;
        try {
            deleteStore = await this.stores.update({
                data: {
                    is_deleted: true
                },
                where: {
                    id: storeID
                }
            });
        } catch {}
        if (!deleteStore) {
            return { statusCode: 'error', statusMessage: 'Could not delete!' };
        }

        return { statusCode: 'ok' };
    }

    // Проверка, имеет ли юзер доступ к редактированию товаров заданных магазинов
    public async checkAccess(userID: number, stores: number[]): Promise<boolean> {
        const userStores = await this.storesOfUser(userID);
        return stores.every(id => userStores.includes(id));
    }
}
