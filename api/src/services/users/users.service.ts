import { Injectable } from '@nestjs/common';
import { SqlService } from "../sql/sql.service";
import { Prisma } from "@prisma/client";

type UserResponse = {
    id?: number;
    name?: string;
    email: string;
    auth_token?: string;
    is_admin?: boolean;
}

@Injectable()
export class UsersService {
    constructor(private sqlService: SqlService) {}

    private readonly users = this.sqlService.client.users;
    private readonly stores = this.sqlService.client.stores;

    async get(token: string): Promise<UserResponse|null> {
        if (!token) return null;
        const user = await this.users.findFirst({
            select: {
                id: true,
                name: true,
                email: true,
                auth_token: true,
                is_admin: true
            },
            where: {
                auth_token: token
            }
        });

        return user ?? null;
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

    async updateLastLogin(user: UserResponse): Promise<void> {
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

    async getAllUsers(data): Promise<any[]> {
        const requestParams = {
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                owned_stores: true,
                is_banned: true
            },
            where: {
                AND: []
            },
            take: 100
        };

        if (data?.id) requestParams.where.AND.push({
            id: data.id
        });

        if (data?.is_banned) requestParams.where.AND.push({
            is_banned: !!data.is_banned
        });

        if (data?.email) requestParams.where.AND.push({
            email: { contains: data.email }
        });

        if (data?.name) requestParams.where.AND.push({
            name: { contains: data.name }
        });

        const result = await this.users.findMany(requestParams);

        return result.map(item => {
            item['stores_count'] = item.owned_stores?.length;
            delete item.owned_stores;
            return item;
        });
    }
}
