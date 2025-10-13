import {Body, Controller, Delete, Get, HttpException, Param, Post, Query, UseGuards} from '@nestjs/common';
import { SqlService } from "../../../services/sql/sql.service";
import { CategoriesService } from "../../../services/categories/categories.service";
import { AdminGuard } from "../../../guards/admin/admin.guard";
import { UserGuard } from "../../../guards/user/user.guard";

@Controller('crm/categories')
export class CategoriesCrmController {
    constructor(private categoriesService: CategoriesService) {}

    @UseGuards(AdminGuard)
    @Get()
    async getCategories() {
        const data = await this.categoriesService.getAll();

        if (data) {
            const result = data.map((item: any) => {
                item.products_count = item._count?.products ?? 0;
                delete item._count;
                return item;
            });
            return { statusCode: 'ok', categories: result };
        }

        throw new HttpException('Something went wrong!', 400);
    }

    @UseGuards(UserGuard)
    @Get('short')
    async getCategoriesShort() {
        return await this.categoriesService.getShortList();
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    async getCategory(@Param('id') id: number) {
        return await this.categoriesService.getOne(id);
    }

    @UseGuards(AdminGuard)
    @Post('create')
    async createCategory(@Body() body: any): Promise<any> {
        return await this.categoriesService.create(body);
    }

    @UseGuards(AdminGuard)
    @Post('update/:id')
    async updateCategory(@Param('id') id: number, @Body() body: any): Promise<any> {
        return await this.categoriesService.update(id, body);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteCategory(
        @Param('id') id: number,
        @Query('replacement') replacement: number
    ): Promise<any> {
        if (isNaN(Number(id)) || isNaN(Number(replacement))) {
            throw new HttpException('Please check your query!', 400);
        }

        const newCategory = await this.categoriesService.getOne(replacement);
        if (!newCategory) {
            throw new HttpException('No replacement with such id!', 400);
        }

        const replaced = await this.categoriesService.replace(id, replacement);
        if (!replaced) {
            throw new HttpException('Check your query and try again!', 400);
        }

        const deleted = await this.categoriesService.delete(id);
        if (!deleted) {
            throw new HttpException('Could not delete!', 400);
        }

        return { statusCode: 'ok' };
    }
}
