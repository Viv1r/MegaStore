import { Injectable } from '@nestjs/common';
import fs from "fs";

const mainFolder = './dist/public/';
const itemsFolder = 'api/assets/items';

@Injectable()
export class ProductsService {
    public async parseImage(productId: number): Promise<string> {
        return new Promise<string>((resolve) => {
            try {
                const regex = /^.*\.(jpg|png|jpeg)$/;
                const folder = itemsFolder + `/${productId}/`;

                const fileCheck = fs.readdirSync(mainFolder + folder).some(file => {
                    if (regex.test(file)) {
                        resolve(folder + file);
                        return true;
                    }
                    return false;
                });

                if (!fileCheck) {
                    resolve(null);
                }
            } catch {
                resolve(null);
            }
        })
    }
}
