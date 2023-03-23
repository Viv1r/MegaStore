import {Controller, Post, Body, Req, Get} from '@nestjs/common';
import { SqlService } from "../../services/sql/sql.service";
import { Prisma } from "@prisma/client";
import { Request } from "express";
import {UsersService} from "../../services/users/users.service";
import {PurchasesService} from "../../services/purchases/purchases.service";

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
    constructor(
        private sqlService: SqlService,
        private usersService: UsersService,
        private purchasesService: PurchasesService
    ) {}

    readonly products = this.sqlService.client.products;

    @Get()
    async getPurchases(): Promise<object> {
        const purchases = await this.purchasesService.getPurchasesAdmin();
        return { statusCode: 'ok', purchases: purchases };
    }

    @Post()
    async makePurchase(@Req() request: Request, @Body() info: PurchaseInfo): Promise<object> {
        const token = request.cookies['token'];
        const user = await this.usersService.get(token);

        if (!user) {
            return { statusCode: 'error', statusMessage: 'Bad token!' };
        }

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

        // Вычисление общей суммы заказа
        const totalSum = info.products.reduce((prev: number, current: ProductInfo): number => {
            const target = products.find(product => product.id === current.id);
            if (!target || !target.price) return prev;
            return prev + (Number(target.price) * current.count);
        }, 0);

        const purchase = {
            buyer_id: user.id,
            sum: totalSum,
            sales: []
        };

        // Регистрация продаж локально
        for (const item of info.products) {
            const target = products.find(product => product.id === item.id);
            purchase.sales.push({
                seller_id: target.store_id,
                product_id: target.id,
                product_count: item.count,
                sum: item.count * Number(target.price)
            });
        }

        const register = await this.purchasesService.registerPurchase(purchase);

        // Проверка, прошла ли покупка
        if (!register) {
            return { statusCode: 'error', statusMessage: 'Could not make a purchase' };
        }

        // Покупка зарегистрирована, и поэтому нужное количество товара отнимается от количества товара в наличии
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

        return {
            statusCode: 'ok',
            purchase: purchase
        };
    }
}
