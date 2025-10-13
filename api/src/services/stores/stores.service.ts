import {HttpException, Injectable} from '@nestjs/common';
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
            throw new HttpException('Check your data!', 400);
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
        throw new HttpException('Check your data!', 400);
    }

    async updateStore(storeID: number, data: any): Promise<any> {
        if (!storeID) {
            throw new HttpException('Please specify correct id!', 400);
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
        throw new HttpException('Check your data!', 400);
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
        throw new HttpException('Check your data!', 400);
    }

    async getAllStores(data?: any): Promise<any> {
        const whereCondition = {
            is_deleted: false,
            AND: []
        };

        if (data?.id) {
            whereCondition.AND.push({
                id: Number(data.id)
            });
        }

        if (data?.name) {
            whereCondition.AND.push({
                name: { contains: data.name }
            });
        }

        if (Array.isArray(data?.owner)) {
            whereCondition.AND.push({
                OR: data.owner.map(id => ({ owner_id: id }) )
            });
        }

        let result;
        try {
            result = await this.stores.findMany({
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
                where: whereCondition,
                orderBy: [{ id: 'desc' }] as any
            });
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
        if (!Number(storeID)) {
            throw new HttpException('Specify correct id!', 400);
        }

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
            return { statusCode: 'ok', item: store };
        }
        throw new HttpException('Check your data!', 400);
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
            throw new HttpException('Could not delete!', 400);
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
            throw new HttpException('Could not delete!', 400);
        }

        return { statusCode: 'ok' };
    }

    // Проверка, имеет ли юзер доступ к редактированию товаров заданных магазинов
    public async checkAccess(userID: number, stores: number[]): Promise<boolean> {
        const userStores = await this.storesOfUser(userID);
        return stores.every(id => userStores.includes(id));
    }

    public async formStoresList(user: any, stores: any[]): Promise<any> {
        let result;

        if (Array.isArray(stores) && stores.length) {
            result = stores;

            if (!user.is_admin) {
                const hasAccess = await this.checkAccess(user.id, stores)
                if (!hasAccess) {
                    return null;
                }
            }
        } else if (!user.is_admin) {
            const userStores = await this.storesOfUser(user?.id);
            if (!userStores.length) {
                return null;
            }
            result = userStores;
        } else {
            result = [];
        }

        return result;
    }


}
