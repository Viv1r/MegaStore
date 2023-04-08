import { Injectable } from '@nestjs/common';
import fs from "fs";
import {SqlService} from "../sql/sql.service";

const mainFolder = './dist/public/';
const itemsFolder = 'api/assets/items';

@Injectable()
export class ProductsService {
    constructor(private sqlService: SqlService) {}

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
