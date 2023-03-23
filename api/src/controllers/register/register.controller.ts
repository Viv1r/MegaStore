/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { SqlService } from 'src/services/sql/sql.service';
import validate from 'src/modules/validate';
import {UsersService} from "../../services/users/users.service";


function generateHash(length): string {
    const rand = (max: number) => Math.floor(Math.random() * Math.floor(max));
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
    constructor(private sqlService: SqlService) {}

    private readonly users = this.sqlService.client.users;

    async emailExists(email: string): Promise<boolean> {
        const data = await this.users.findFirst({
            where: {
                email: email
            }
        });

        return !!data;
    }

    @Post()
    async registerPost(@Body() body, @Res({ passthrough: true }) response: Response): Promise<object> {
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

        let user;
        try {
            user = await this.users.create({
                data: { ...registerData, auth_token: generateHash(64) }
            });
        } catch (err) {
            console.log(err);
        }

        if (user) {
            response.cookie('token', user.auth_token);
            return { statusCode: 'ok', user: user };
        }

        return { statusCode: 'error', statusMessage: 'Something went wrong!' };
    }
}