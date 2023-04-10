import { Injectable } from '@nestjs/common';
import { SqlService } from "../sql/sql.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private sqlService: SqlService) {}

    private readonly users = this.sqlService.client.users;
    private readonly stores = this.sqlService.client.stores;

    async get(token: string): Promise<any> {
        if (!token) return null;

        let user: any;
        try {
            user = await this.users.findFirst({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    auth_token: true,
                    is_banned: true,
                    is_admin: true
                },
                where: {
                    auth_token: token
                }
            });
        } catch {}

        // Отчасти костыль, но так надо
        if (user?.email === 'root') {
            user.is_root = true;
            user.is_admin = true;
        }

        return user;
    }

    async getById(id: number): Promise<any> {
        return await this.users.findFirst({
            where: {
                id: id
            }
        });
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

    async updateLastLogin(user: any): Promise<void> {
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

    async banById(id: number): Promise<any> {
        if (!id) return {statusCode: 'error'};

        const result = await this.users.update({
            where: {
                id: id
            },
            data: {
                is_banned: true
            }
        });

        if (result) {
            return {statusCode: 'ok'};
        }
        if (!id) return {statusCode: 'error', statusMessage: `The user #${id} was not banned!`};
    }

    async updateProfilePicture(userID: number, pictureLink: string): Promise<boolean> {
        let result;
        try {
            result = await this.users.update({
                data: {
                    profile_picture: pictureLink
                },
                where: {
                    id: Number(userID)
                }
            });
        } catch {}

        return !!result;
    }

    public async createUser(data: any): Promise<any> {
        const newUserData = {
            email: data?.email,
            password: data?.password,
            name: data?.name,
            is_banned: data?.is_banned ?? false
        };

        const emptyFields = Object.keys(newUserData).filter(key => newUserData[key] === undefined);
        if (emptyFields?.length) {
            return {
                statusCode: 'error',
                statusMessage: 'Check these fields: '
                    + emptyFields.toString()
                        .replaceAll(',', ', ')
                        .replaceAll('_', ' ')
            };
        }

        let newUser;
        try {
            newUser = await this.users.create({
                data: newUserData
            });
        } catch {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        return { statusCode: 'ok', product: newUser };
    }

    public async updateUser(userID: number, data: any): Promise<any> {
        if (!userID) return { statusCode: 'error', statusMessage: 'Pleace specify the product id!' };

        const newData = {
            email: data?.email,
            password: data?.password,
            name: data?.name,
            is_banned: data?.is_banned,
        };

        if (Object.values(newData).every(item => item === undefined)) {
            return { statusCode: 'error', statusMessage: 'No new fields! You can specify: '
                + Object.keys(newData).toString()
                    .replaceAll(',', ', ')
            }
        }

        let updatedUser;
        try {
            updatedUser = await this.users.update({
                data: newData,
                where: {
                    id: userID
                }
            });
        } catch {
            return { statusCode: 'error', statusMessage: 'Check your data!' };
        }

        return { statusCode: 'ok', product: updatedUser };
    }

    async getAllUsers(data): Promise<any[]> {
        const requestParams = {
            include: {
                _count: {
                    select: { owned_stores: true }
                }
            },
            where: {
                AND: []
            },
            orderBy: [
                {
                    id: 'desc'
                }
            ] as any,
            take: 100
        };

        if (data?.id) requestParams.where.AND.push({
            id: data.id
        });

        if (data?.is_banned) requestParams.where.AND.push({
            is_banned: !!data.is_banned
        });

        if (data?.is_admin) requestParams.where.AND.push({
            is_admin: !!data.is_admin
        });

        if (data?.email) requestParams.where.AND.push({
            email: { contains: data.email }
        });

        if (data?.name) requestParams.where.AND.push({
            name: { contains: data.name }
        });

        let result;
        try {
            result = await this.users.findMany(requestParams);
        } catch {
            result = [];
        }

        return result.map(item => {
            item.stores_count = item._count.owned_stores;
            delete item._count;
            return item;
        });
    }

    async getUsersShort(): Promise<any> {
        let result;
        try {
            result = await this.users.findMany({
                select: {
                    id: true,
                    email: true
                }
            });
        } catch {
            result = [];
        }

        return result.map(item => {
            return { id: item.id, name: item.email }
        });
    }
}
