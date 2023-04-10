import {Get, Injectable} from '@nestjs/common';
import {SqlService} from "../sql/sql.service";

@Injectable()
export class CategoriesService {
    constructor(private sqlService: SqlService) {}

    private categories = this.sqlService.client.categories;
    private products = this.sqlService.client.products;

    async get(): Promise<any> {
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
                }
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
        return { statusCode: 'error' };
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

        return result ?? null;
    }

    async create(data: any) {
        if (!data.name) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
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
        return { statusCode: 'error', statusMessage: 'Could not create!' };
    }

    async update(id: number, data: any) {
        id = Number(id);

        if (isNaN(id) || !data.name) {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
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
        return { statusCode: 'error', statusMessage: 'Could not create!' };
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
            await this.products.update({
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
