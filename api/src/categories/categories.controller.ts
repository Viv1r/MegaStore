/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly sqlService: SqlService) {}

    private readonly categories = this.sqlService.client.categories;
    
    @Get()
    async getCategories() {
        const data = await this.categories.findMany();
        if (data) {
            return {statusCode: 'ok', categories: data};
        }
    }
}
