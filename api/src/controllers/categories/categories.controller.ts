/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { SqlService } from 'src/services/sql/sql.service';
import {CategoriesService} from "../../services/categories/categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    
    @Get()
    async getCategories() {
        return await this.categoriesService.getShortList();
    }
}
