import { Injectable } from '@nestjs/common';
import { SqlService } from "../sql/sql.service";
import { Prisma } from "@prisma/client";

type User = {
    id?: number;
    name?: string;
    email: string;
}

@Injectable()
export class UsersService {
    constructor(private sqlService: SqlService) {}

    private readonly users = this.sqlService.client.users;

    async get(token: string): Promise<User|null> {
        if (!token) return null;
        const user = await this.users.findFirst({
            select: {
                id: true,
                name: true,
                email: true
            },
            where: {
                auth_token: token
            }
        });

        return user || null;
    }

    async getToken(email: string, password: string): Promise<string|null> {
        const user = await this.users.findFirst({
            select: {
                name: true,
                email: true,
                auth_token: true
            },
            where: {
                email: email,
                password: password
            }
        });

        if (user && user.auth_token) {
            return user.auth_token;
        }
        return null;
    }

    async updateLastLogin(user: User): Promise<void> {
        if (!user || !user.id) return;
        await this.users.update({
            where: {
                id: user.id
            },
            data: {
                last_login: new Date()
            }
        });
    }
}