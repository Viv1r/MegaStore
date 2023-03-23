import { Controller, Post, Body } from '@nestjs/common';
import { SqlService } from "../../services/sql/sql.service";
import { Prisma } from "@prisma/client";

interface ProductInfo {
    title?: string;
    id: number;
    count: number;
}

interface PurchaseInfo {
    products: ProductInfo[]
}

type Product = Prisma.productsGetPayload<object>;

@Controller('purchase')
export class PurchaseController {
    constructor(private sqlService: SqlService) {}

    readonly products = this.sqlService.client.products;

    @Post()
    async makePurchase(@Body() info: PurchaseInfo): Promise<object> {
        if (!info || !info.products) {
            return { statusCode: 'error', statusMessage: 'Bad request!' };
        }

        const outOfStock: ProductInfo[] = []; // В массив улетают продукты, которых в наличии меньше, чем нужно
        const products: Product[] = [];

        for (const item of info.products) {
            if (!(item.id && item.count && item.title)) {
                return {statusCode: 'error', statusMessage: 'Bad request!'};
            }

            const targetProduct = await this.products.findFirst({
                where: {
                    id: item.id
                }
            })
            if (!targetProduct) {
                return {statusCode: 'error', statusMessage: `Product "${item.title}" not found!`};
            }
            if (targetProduct.count_available < item.count) {
                outOfStock.push({id: item.id, count: targetProduct.count_available});
                continue;
            }
            products.push(targetProduct);
        }

        if (outOfStock.length) {
            return {
                statusCode: 'out_of_stock',
                statusMessage: `Some products are out of stock!`,
                products: outOfStock
            };
        }

        for (const item of info.products) {
            const target = products.find(product => product.id === item.id);
            const newCount = target.count_available - item.count;
            await this.products.update({
                where: {
                    id: item.id
                },
                data: {
                    count_available: newCount
                }
            });
        }

        const totalSum = info.products.reduce((prev: number, current: ProductInfo): number => {
            const target = products.find(product => product.id === current.id);
            return prev + (Number(target.price) * current.count);
        }, 0);

        return {
            status: 'ok',
            total: totalSum
        };
    }
}
