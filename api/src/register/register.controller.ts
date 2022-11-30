import { Controller, Post, Body } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import validate from 'src/modules/validate';

@Controller('register')
export class RegisterController {
    constructor(private readonly sqlService: SqlService) {}

    async emailExists(email: string): Promise<Boolean> {
        const data = await this.sqlService.client.users.findFirst({
            where: {
                email: email
            }
        });

        return data !== null;
    }

    @Post()
    async registerPost(@Body() body): Promise<Object> {
        const registerData = {
            email: validate.email(body.email),
            password: body.password
        };

        const badFields = Object.keys(registerData).filter(key => !registerData[key]);
        if (badFields.length) {
            return { statusCode: 'error', statusMessage: 'Check these fields: ' + badFields.join(', ') };
        }

        const check = await this.emailExists(registerData.email);
        if (check) {
            return { statusCode: 'error', statusMessage: 'This email is already taken!' };
        }

        let result;
        try {
            result = await this.sqlService.client.users.create({
                data: registerData
            });
        } catch (err) {
            console.log(err);
        }

        if (result) {
            return { statusCode: 'ok', result: result };
        }

        return { statusCode: 'error', statusMessage: 'Something went wrong!' };
    }
}