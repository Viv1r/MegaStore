import { Controller, Post, Body } from '@nestjs/common';
import { SqlService } from 'src/sql/sql.service';

import fs from 'fs';

const mainFolder = './dist/public/';
const itemsFolder = 'assets/items';

@Controller('product-details')
export class ProductDetailsController {
    constructor(private readonly sqlService: SqlService) {}

    @Post()
    async productDetailsPost(@Body() body) {
        if (isNaN(Number(body.id)) || body.id === null) {
            return { statusCode: 'error', statusMessage: 'Wrong ID!' };
        }

        const result = await this.sqlService.client.products.findFirst({
            where: {
                id: Number(body.id)
            }
        });

        if (result) {
            const picturesList = [];
            
            try {
                const regex = /^.*\.(jpg|png|jpeg)$/;
                const folder = itemsFolder + `/${result.id}/`;

                fs.readdirSync(mainFolder + folder).forEach(file => {
                    if (regex.test(file)) {
                        picturesList.push(folder + file);
                    }
                });
            } catch (err) {
                console.log(err);
            }

            result.attributes = JSON.parse(result.attributes) || {};
            
            return { statusCode: 'ok', data: { ...result, pictures: picturesList } };
        }

        return { statusCode: 'error', statusMessage: 'Product not found!' };
    }
}