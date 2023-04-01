import {Controller, Get} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";

@Controller('users')
export class UsersController {
    constructor(protected usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<any> {
        const users = await this.usersService.getAllUsers();
        if (users?.length) {
            return { statusCode: 'ok', users: users };
        }
        return { statusCode: 'error' };
    }
}
