import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';

@Controller('login')
export class LoginController {
    constructor(private readonly sqlService: SqlService) {}

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
            return { statusCode: 'error', statusMessage: 'Bad details!' }
        }
        
        let user;
        try {
            user = await this.users.findFirst({
                select: {
                    name: true,
                    email: true,
                    auth_token: true
                },
                where: authData
            });
        } catch(error) {
            console.log(error);
        } finally {
            if (user) {
                response.cookie('token', user.auth_token);
                delete user.auth_token;
                return { statusCode: 'ok', user: user };
            }
            response.clearCookie('token');
            return { statusCode: 'error', statusMessage: 'Wrong email or password!' };
        }
    }
}
