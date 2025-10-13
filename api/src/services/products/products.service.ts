import {HttpException, Injectable} from '@nestjs/common';
import fs from "fs";
import {SqlService} from "../sql/sql.service";
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

    public async get(id: number): Promise<any> {
        let result;
        try {
            result = await this.products.findFirst({
                where: {
                    id: Number(id),
                    is_deleted: false
                }
            });
        } catch {}

        return result;
    }

    public async getAll(user: any, query: any, data: any): Promise<any> {
        const conditions = {
            is_deleted: false,
            AND: []
        };
        let categoryQuery, storeQuery;

        // Формирование списка категорий в запросе
        if (Array.isArray(data?.category)) {
            categoryQuery = data.category.map(id => { return { category_id: id } });
        }

        // Формирование списка магазинов в запросе (в т. ч. сверка с наличием доступа у юзера)
        storeQuery = await this.storesService.formStoresList(user, data.store);
        if (!storeQuery) {
            throw new HttpException('No access to some of the stores or no stores present!', 400);
        }

        if (categoryQuery?.length) {
            conditions.AND.push({
                OR: categoryQuery
            });
        }

        if (storeQuery?.length) {
            conditions.AND.push({
                OR: storeQuery.map(id => ({ store_id: id }))
            });
        }

        if (data?.title) {
            conditions.AND.push({
                title: { contains: data.title }
            });
        }

        if (data?.description) {
            conditions.AND.push({
                description: { contains: data.description }
            });
        }

        if (data?.id) {
            conditions.AND.push({
                id: data.id
            });
        }

        if (data?.price) {
            conditions.AND.push({
                price: {
                    gte: data.price.min,
                    lte: data.price.max
                }
            });
        }

        if (data?.count_available) {
            conditions.AND.push({
                count_available: {
                    gte: data.count_available.min,
                    lte: data.count_available.max
                }
            });
        }

        const count = Number(query?.count) || 10;
        let skip;
        if (query?.page > 1) {
            skip = Number(query.count) * (query.page - 1);
        }

        let result: any[];
        try {
            result = await this.products.findMany({
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
                where: conditions,
                orderBy: [{ id: 'desc' }] as any,
                take: count,
                skip: skip
            });
        } catch (error) {
            throw new HttpException('Wrong data!', 400);
        }

        if (result) {
            for (const item of result) {
                item.picture = await this.parseImage(item.id);
            }
            return { statusCode: 'ok', products: result };
        }
        throw new HttpException('Something went wrong!', 400);
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
            throw new HttpException('Could not delete, try again later', 400);
        }

        if (response) {
            return { statusCode: 'ok' };
        }

        throw new HttpException('Could not delete, try again later', 400);
    }

    public async createProduct(data: any): Promise<any> {
        if (!data) {
            throw new HttpException('No data!', 400);
        }

        const newProductData = {
            title: data.title,
            description: data.description,
            price: data.price,
            price_postfix: data.price_postfix ?? null,
            count_available: data.count_available ?? 1,
            store_id: data.store_id,
            category_id: data.category_id,
            attributes: JSON.stringify(data.attributes ?? {})
        };

        const emptyFields = Object.keys(newProductData).filter(key => newProductData[key] === undefined);
        if (emptyFields?.length) {
            const errorMessage = 'Check these fields: ' + emptyFields.join(', ').replaceAll('_', ' ');
            throw new HttpException(errorMessage, 400);
        }

        if (newProductData.price <= 0) {
            throw new HttpException('Price cannot be zero or lower!', 400);
        }

        let newProduct;
        try {
            newProduct = await this.products.create({
                data: newProductData
            });
        } catch(error) {
            throw new HttpException('Check your data!', 400);
        }

        return { statusCode: 'ok', product: newProduct };
    }

    public async updateProduct(productID: number, data: any): Promise<any> {
        if (!productID) {
            throw new HttpException('Pleace specify the product id!', 400);
        }
        if (!data) {
            throw new HttpException('No data!', 400);
        }

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
            const errorMessage = 'No new fields! You can specify: ' + Object.keys(newData).join(', ');
            throw new HttpException(errorMessage, 400);
        }

        if (newData.price <= 0) {
            throw new HttpException('Price cannot be zero or lower!', 400);
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
            throw new HttpException('Check your data!', 400);
        }

        return { statusCode: 'ok', product: updatedProduct };
    }
}
