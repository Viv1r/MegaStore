import {Body, Controller, Delete, Get, Post, Param, Query, UseGuards, Req, Redirect} from '@nestjs/common';
import {SqlService} from "../../services/sql/sql.service";
import {ProductsService} from "../../services/products/products.service";
import {Decimal} from "@prisma/client/runtime";
import {UserGuard} from "../../guards/user/user.guard";
import {UsersService} from "../../services/users/users.service";
import {StoresService} from "../../services/stores/stores.service";
import {AdminGuard} from "../../guards/admin/admin.guard";

@Controller('crm')
export class CrmController {
    @Redirect("https://crm.alymoff.ru", 301)
    @Get()
    goToCRM() {}
}
