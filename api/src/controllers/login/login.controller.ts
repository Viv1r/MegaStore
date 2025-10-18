import {Controller, Post, Body, Req, Res, HttpException} from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';
import {UsersService} from "../../services/users/users.service";

@Controller('login')
export class LoginController {
    constructor(private sqlService: SqlService, private usersService: UsersService ) {}

    private readonly users = this.sqlService.client.users;

    @Post()
    async loginByEmail(
        @Body() body: { email: string, password: string },
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ): Promise<object> {
		const authData = {
            email: body.email,
            password: body.password
        };

        if (!(authData.email && authData.password)) {
            throw new HttpException('Bad details!', 401);
        }
        
        let token;
        try {
            token = await this.usersService.getToken(authData.email, authData.password);
        } catch(error) {
            console.log(error);
        }

        if (token) {
            const user = await this.usersService.get(token);

            if (user?.is_banned) {
                throw new HttpException('You are banned!', 403);
            }

            response.cookie('token', token);
            await this.usersService.updateLastLogin(user);

            return {
                statusCode: 'ok',
                user: user
            };
        }
        
        response.clearCookie('token');
        throw new HttpException('Wrong email or password!', 401);
    }
}
