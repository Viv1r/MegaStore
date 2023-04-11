import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { UsersService } from "../../../services/users/users.service";
import { AdminGuard } from "../../../guards/admin/admin.guard";
import {PicturesService} from "../../../services/pictures/pictures.service";

@Controller('crm/users')
export class UsersController {
    constructor(private usersService: UsersService, private picturesService: PicturesService) {}

    @UseGuards(AdminGuard)
    @Post()
    async getAllUsers(@Body() body: any): Promise<any> {
        const users = await this.usersService.getAll(body);

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
            return { statusCode: 'ok', item: user };
        }

        return { statusCode: 'error' };
    }

    @UseGuards(AdminGuard)
    @Post('ban/:id')
    async banUser(@Param('id') id: number): Promise<any> {
        id = Number(id);
        if (isNaN(id)) return { statusCode: 'error', statusMessage: 'Invalid id!' };

        return await this.usersService.banById(id);
    }

    @UseGuards(AdminGuard)
    @Post('picture/:id')
    async updatePicture(@Param('id') id: number, @Body() body: any): Promise<any> {
        id = Number(id);
        if (isNaN(id)) return { statusCode: 'error', statusMessage: 'Invalid id!' };

        return await this.picturesService.updateProfilePicture(id, body.picture);
    }

    @UseGuards(AdminGuard)
    @Post('update/:id')
    async updateUser(@Body() body: any, @Param('id') id: number): Promise<any> {
        id = Number(id);
        if (isNaN(id)) return { statusCode: 'error', statusMessage: 'Invalid id!' };

        return await this.usersService.updateUser(id, body);
    }

    @UseGuards(AdminGuard)
    @Post('create')
    async createUser(@Body() body: any): Promise<any> {
        return await this.usersService.createUser(body);
    }

}
