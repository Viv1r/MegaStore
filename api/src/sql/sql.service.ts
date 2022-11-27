import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlService {
    public readonly client = new PrismaClient();
}