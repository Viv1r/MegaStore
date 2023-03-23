import { Injectable } from '@nestjs/common';
import { SqlService } from "../sql/sql.service";
import { Prisma } from "@prisma/client";

type Purchase = Prisma.purchasesGetPayload<object>;

@Injectable()
export class PurchasesService {
    constructor(private sqlService: SqlService) {}

    readonly purchases = this.sqlService.client.purchases;

    async registerPurchase(data: object): Promise<boolean> {
        if (!data) return false;

        const purchase = data as Purchase;
        const sales = (data as { sales? }).sales;
        const result = await this.purchases.create({
            data: {
                buyer_id: purchase.buyer_id,
                sum: purchase.sum,
                sales: {
                    createMany: {
                        data: sales
                    }
                }
            }
        });
        console.log('New purchase!', result);
        return !!result;
    }

    async getPurchasesAdmin(count?: number, skip?: number): Promise<Purchase[]> {
        const purchases = await this.purchases.findMany({
            select: {
                id: true,
                buyer_id: true,
                sum: true,
                datetime: true,
                sales: true
            },
            skip: skip || 0,
            take: count || 100
        });
        return purchases || [];
    }
}
