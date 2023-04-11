import { Injectable } from '@nestjs/common';
import { SqlService } from "../sql/sql.service";
import {StoresService} from "../stores/stores.service";

@Injectable()
export class SalesService {
    constructor(private sqlService: SqlService, private storesService: StoresService) {}

    private readonly sales = this.sqlService.client.sales;

    async getAll(user: any, data: any): Promise<any> {
        const whereCondition = {
            AND: []
        };

        // Формирование списка магазинов (админ видит продажи всех магазинов, если не указал конкретные)
        const storeQuery = await this.storesService.formStoresList(user, data.seller);

        if (!storeQuery) {
            return { statusCode: 'error', statusMessage: 'No access to some of the stores or no stores present!' };
        } else if (storeQuery?.length) {
            whereCondition.AND.push({
                OR: storeQuery.map(id => ({ seller_id: id }))
            });
        }

        if (data?.id) {
            whereCondition.AND.push({
                id: Number(data.id)
            });
        }

        if (data?.sum) {
            whereCondition.AND.push({
                sum: {
                    gte: data.sum.min,
                    lte: data.sum.max
                }
            });
        }

        let result;
        try {
            result = await this.sales.findMany({
                include: {
                    seller: {
                        select: {
                            name: true
                        }
                    },
                    product: {
                        select: {
                            title: true
                        }
                    },
                    purchase: { select: { buyer: { select: { email: true } } } }
                },
                where: whereCondition,
                orderBy: [{ id: 'desc' }] as any
            });
        } catch {}

        if (result) {
            return result.map(item => {
                item.seller = item.seller?.name;
                item.product = item.product?.title;
                item.buyer = item.purchase?.buyer?.email;
                delete item.purchase;
                return item;
            });
        }
        return [];
    }

    async getOne(id: number) {
        let result;
        try {
            result = await this.sales.findFirst({
                where: {
                    id: Number(id)
                }
            });
        } catch {}

        if (result) {
            return { statusCode: 'ok', sale: result };
        }
        return { statusCode: 'error', statusMessage: 'Not found!' };
    }
}
