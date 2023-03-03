import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';

@Controller('token-auth')
export class TokenAuthController {
    constructor(private readonly sqlService: SqlService) {}

    private readonly users = this.sqlService.client.users;

    @Post()
    async authByToken(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<object> {
		const token = request.cookies['token'];
        if (!token) {
			return { statusCode: 'error', statusMessage: 'bad token!' };
		}

        let user;
        try {
            user = await this.users.findFirst({
                select: {
                    name: true,
                    email: true
                },
                where: {
                    auth_token: token
                }
            });
        } catch(error) {
            console.log(error);
        } finally {
            if (user) {
                return { statusCode: 'ok', user: user };
            }
            response.clearCookie('token');
            return { statusCode: 'error', statusMessage: 'bad request!' };
        }
    }
}
