import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { UsersService } from "../../../services/users/users.service";
import { AdminGuard } from "../../../guards/admin/admin.guard";

@Controller('crm/users')
export class UsersController {
    constructor(protected usersService: UsersService) {}

    @UseGuards(AdminGuard)
    @Post()
    async getAllUsers(@Body() body: any): Promise<any> {
        const users = await this.usersService.getAllUsers(body);

        if (users?.length) {
            return { statusCode: 'ok', users: users };
        }

        return { statusCode: 'error' };
    }

    @UseGuards(AdminGuard)
    @Get('short')
    async getUsersShort(): Promise<any> {
        const users = await this.usersService.getUsersShort();
        if (users) {
            return { statusCode: 'ok', items: users };
        }
        return { statusCode: 'error' };
    }

    @UseGuards(AdminGuard)
    @Get(':id')
    async getUser(@Param('id') id: number): Promise<any> {
        const user = await this.usersService.getById(Number(id));

        if (user) {
            return user;
        }

        return { statusCode: 'error' };
    }

    @UseGuards(AdminGuard)
    @Post('ban/:id')
    async banUser(@Param('id') id: number): Promise<any> {
        return await this.usersService.banById(Number(id));
    }

    @UseGuards(AdminGuard)
    @Post('update/:id')
    async updateUser(@Body() body: any, @Param('id') id: number): Promise<any> {
        const targetID = Number(id);
        if (isNaN(targetID)) return { statusCode: 'error', statusMessage: 'Specify correct id!' };

        return await this.usersService.updateUser(targetID, body);
    }

    @UseGuards(AdminGuard)
    @Post('create')
    async createUser(@Body() body: any): Promise<any> {
        return await this.usersService.createUser(body);
    }

}
