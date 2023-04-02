import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {UserGuard} from "../../guards/user/user.guard";

@Controller('users')
export class UsersController {
    constructor(protected usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Post()
    async getAllUsers(@Body() body: any): Promise<any> {
        const users = await this.usersService.getAllUsers(body);

        if (users?.length) {
            return { statusCode: 'ok', users: users };
        }

        return { statusCode: 'error' };
    }
}
