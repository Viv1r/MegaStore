/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';
import validate from 'src/modules/validate';


function generateHash(length): string {
    const rand = (max) => Math.floor(Math.random() * Math.floor(max));
    const SYMBOLS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let result = '';
    for (let i = 0; i < length; i++) {
        const selector = rand(2);
        result += selector ? SYMBOLS[rand(SYMBOLS.length)] : rand(10);
    }
    return result;
}

@Controller('register')
export class RegisterController {
    constructor(private readonly sqlService: SqlService) {}

    async emailExists(email: string): Promise<boolean> {
        const data = await this.sqlService.client.users.findFirst({
            where: {
                email: email
            }
        });

        return data !== null;
    }

    @Post()
    async registerPost(@Body() body): Promise<object> {
        const registerData = {
            email: validate.email(body.email),
            password: body.password,
            name: body.name
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
                data: { ...registerData, auth_token: generateHash(64) }
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