import {Get, HttpException, Injectable} from '@nestjs/common';
import {SqlService} from "../sql/sql.service";

@Injectable()
export class CategoriesService {
    constructor(private sqlService: SqlService) {}

    private categories = this.sqlService.client.categories;
    private products = this.sqlService.client.products;

    async getAll(): Promise<any> {
        let result;
        try {
            result = await this.categories.findMany({
                include: {
                    _count: {
                        select: {
                            products: true
                        }
                    },
                },
                where: {
                    is_deleted: false
                },
                orderBy: [
                    {
                        id: 'desc'
                    }
                ] as any
            });
        } catch {}

        return result ?? [];
    }

    async getShortList(): Promise<any> {
        const data = await this.categories.findMany({
            select: {
                id: true,
                name: true,
            },
            where: {
                is_deleted: false
            }
        });
        if (data) {
            return { statusCode: 'ok', items: data };
        }
        throw new HttpException('Something went wrong!', 400);
    }

    async getOne(id: number): Promise<any> {
        if (isNaN(Number(id))) return null;

        let result;
        try {
            result = await this.categories.findFirst({
                where: {
                    id: Number(id),
                    is_deleted: false
                }
            });
        } catch {}

        if (result) {
            return { statusCode: 'ok', item: result };
        }
        throw new HttpException('Try again later!', 400);
    }

    async create(data: any) {
        if (!data.name) {
            throw new HttpException('Check your data!', 400);
        }

        let newCategory;
        try {
            newCategory = await this.categories.create({
                data: {
                    name: String(data.name)
                }
            })
        } catch {}

        if (newCategory) {
            return { statusCode: 'ok' };
        }
        throw new HttpException('Could not create!', 400);
    }

    async update(id: number, data: any) {
        id = Number(id);

        if (isNaN(id) || !data.name) {
            throw new HttpException('Check your data!', 400);
        }

        let updatedCategory;
        try {
            updatedCategory = await this.categories.update({
                data: {
                    name: String(data.name)
                },
                where: {
                    id: id
                }
            });
        } catch {}

        if (updatedCategory) {
            return { statusCode: 'ok' };
        }
        throw new HttpException('Could not create!', 400);
    }

    async replace(oldCategory: number, newCategory: number): Promise<boolean> {
        try {
            await this.products.updateMany({
                data: {
                    category_id: Number(newCategory)
                },
                where: {
                    category_id: Number(oldCategory)
                }
            });
            return true;
        } catch {
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.categories.update({
                data: {
                    is_deleted: true
                },
                where: {
                    id: Number(id)
                }
            });
            return true
        } catch {
            return false;
        }
    }
}
