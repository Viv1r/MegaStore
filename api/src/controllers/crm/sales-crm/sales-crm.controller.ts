import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {AdminGuard} from "../../../guards/admin/admin.guard";
import {SalesService} from "../../../services/sales/sales.service";
import {UserGuard} from "../../../guards/user/user.guard";

@Controller('crm/sales')
export class SalesCrmController {
    constructor(private salesService: SalesService) {}

    @UseGuards(UserGuard)
    @Post()
    async getAllSales(@Req() request: any, @Body() body: any): Promise<any> {
        const sales = await this.salesService.getAll(request.user, body);

        if (sales) {
            return { statusCode: 'ok', sales: sales };
        }
        return { statusCode: 'error' };
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    async getSale(@Param('id') id: number): Promise<any> {
        const sale = await this.salesService.getOne(Number(id));

        if (sale) {
            return { statusCode: 'ok', item: sale };
        }
        return { statusCode: 'error' };
    }
}
