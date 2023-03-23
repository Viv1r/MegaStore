import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';
import { UsersService } from "../../services/users/users.service";

@Controller('token-auth')
export class TokenAuthController {
    constructor(private usersService: UsersService) {}

    @Post()
    async authByToken(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<object> {
		const token = request.cookies['token'];
        if (!token) {
			return { statusCode: 'error', statusMessage: 'bad token!' };
		}

        let user;
        try {
            user = await this.usersService.get(token);
        } catch(error) {
            console.log(error);
        }
        if (user) {
            await this.usersService.updateLastLogin(user);
            return { statusCode: 'ok', user: user };
        }

        response.clearCookie('token');
        return { statusCode: 'error', statusMessage: 'bad request!' };
    }
}
