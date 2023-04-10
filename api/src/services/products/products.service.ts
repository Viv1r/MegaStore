import { Injectable } from '@nestjs/common';
import fs from "fs";
import {SqlService} from "../sql/sql.service";
import {Product} from "../../controllers/crm/types/Product";
import {StoresService} from "../stores/stores.service";

const mainFolder = './dist/public/';
const itemsFolder = 'api/assets/items';

@Injectable()
export class ProductsService {
    constructor(private sqlService: SqlService, private storesService: StoresService) {}

    private readonly products = this.sqlService.client.products;

    public async parseImage(productId: number): Promise<string> {
        return new Promise<string>((resolve) => {
            try {
                const regex = /^.*\.(jpg|png|jpeg)$/;
                const folder = itemsFolder + `/${productId}/`;

                const fileCheck = fs.readdirSync(mainFolder + folder).some(file => {
                    if (regex.test(file)) {
                        resolve(folder + file);
                        return true;
                    }
                    return false;
                });

                if (!fileCheck) {
                    resolve(null);
                }
            } catch {
                resolve(null);
            }
        })
    }

    public async getProducts(user: any, query: any, data: any): Promise<any> {
        let categoryQuery, storeQuery;

        // Формирование списка категорий в запросе
        if (Array.isArray(data?.category)) {
            categoryQuery = data.category.map(id => { return { category_id: id } });
        }

        // Формирование списка магазинов в запросе (в т. ч. сверка с наличием доступа у юзера)
        if (Array.isArray(data?.store) && data.store.length) {
            storeQuery = data.store.map(id => { return { store_id: id } });

            if (!user.is_admin) {
                const hasAccess = await this.storesService.checkAccess(user.id, data.store)
                if (!hasAccess) {
                    return { statusCode: 'error', statusMessage: 'No access to some of the stores!' };
                }
            }
        } else if (!user.is_admin) {
            const userStores = await this.storesService.storesOfUser(user?.id);
            if (!userStores.length) {
                return { statusCode: 'ok', products: [] };
            }
            storeQuery = userStores.map(id => { return { store_id: id } });
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
                is_deleted: false,
                AND: []
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ] as any,
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

        if (data?.title) requestParams.where.AND.push({
            title: { contains: data.title }
        });

        if (data?.description) requestParams.where.AND.push({
            description: { contains: data.description }
        });

        if (data?.id) requestParams.where.AND.push({
            id: data.id
        });

        if (data?.price) requestParams.where.AND.push({
            price: {
                gte: data.price.min ?? undefined,
                lte: data.price.max ?? undefined
            }
        });

        if (data?.count_available) requestParams.where.AND.push({
            count_available: {
                gte: data.count_available.min ?? undefined,
                lte: data.count_available.max ?? undefined
            }
        });

        let result: Product[];

        try {
            result = await this.products.findMany(requestParams);
        } catch (error) {
            return { statusCode: 'error', statusMessage: 'Wrong data!' };
        }

        return { statusCode: 'ok', products: result };
    }

    public async deleteProducts(products: number[]): Promise<any> {
        const productsQuery = products.map(id => { return { id: Number(id) } });

        let response;
        try {
            response = await this.products.updateMany({
                data: {
                    is_deleted: true
                },
                where: {
                    OR: productsQuery
                }
            });
        } catch {
            return { statusCode: 'error', statusMessage: 'Could not delete, try again later' };
        }

        if (response) {
            return { statusCode: 'ok' };
        }
        return { statusCode: 'error', statusMessage: 'Could not delete, try again later' };
    }

    public async createProduct(data: any): Promise<any> {
        if (!data) return { statusCode: 'error', statusMessage: 'No data!' };

        const newProductData = {
            title: data.title,
            description: data.description,
            price: data.price,
            price_postfix: data.price_postfix || null,
            count_available: data.count_available || 1,
            store_id: data.store_id,
            category_id: data.category_id,
            attributes: data.attributes || null
        };

        const emptyFields = Object.keys(newProductData).filter(key => newProductData[key] === undefined);
        if (emptyFields?.length) {
            return {
                statusCode: 'error',
                statusMessage: 'Check these fields: '
                    + emptyFields.toString()
                        .replaceAll(',', ', ')
                        .replaceAll('_', ' ')
            };
        }

        let newProduct;
        try {
            newProduct = await this.products.create({
                data: newProductData
            });
        } catch(error) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        return { statusCode: 'ok', product: newProduct };
    }

    public async updateProduct(productID: number, data: any): Promise<any> {
        if (!productID) return { statusCode: 'error', statusMessage: 'Pleace specify the product id!' };
        if (!data) return { statusCode: 'error', statusMessage: 'No data!' };

        const newData = {
            title: data.title,
            description: data.description,
            price: data.price,
            price_postfix: data.price_postfix,
            count_available: data.count_available,
            store_id: data.store_id,
            category_id: data.category_id,
            attributes: JSON.stringify(data.attributes)
        };

        if (Object.values(newData).every(item => item === undefined)) {
            return { statusCode: 'error', statusMessage: 'No new fields! You can specify: '
                + Object.keys(newData).toString()
                    .replaceAll(',', ', ')
            }
        }

        let updatedProduct;
        try {
            updatedProduct = await this.products.update({
                data: newData,
                where: {
                    id: productID
                }
            });
        } catch(error) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        return { statusCode: 'ok', product: updatedProduct };
    }
}
