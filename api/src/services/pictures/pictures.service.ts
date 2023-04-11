import { Injectable } from '@nestjs/common';
import jimp from 'jimp';
import { generateHash } from "../../modules/hashgen";
import { UsersService } from "../users/users.service";
import {ProductsService} from "../products/products.service";

@Injectable()
export class PicturesService {
    constructor(private usersService: UsersService, private productsService: ProductsService) {}

    readonly baseURL = 'dist/public/';

    private async readPicture(pictureBase64): Promise<any> {
        const img = await jimp.read(
            Buffer.from(pictureBase64, 'base64')
        );
        const [width, height] = [img.bitmap.width, img.bitmap.height];
        if (!width || !height) {
            return null;
        }

        // Обрезка до пропорций 1:1
        if (width > height) {
            return img.crop((width-height)/2, 0, height*0.99, height*0.99);
        }
        return img.crop(0, (height-width)/2, width*0.99, width*0.99);
    }

    async updateProfilePicture(userID: number, pictureBase64: string): Promise<any> {
        if (!userID || !pictureBase64) {
            return { statusCode: 'error', statusMessage: 'Check userID and picture!' };
        }

        let resultPicture; // Сюда отправляется аватарка, если загружена и валидна
        try {
            resultPicture = await this.readPicture(pictureBase64);
        } catch (e) {
            return { statusCode: 'error', statusMessage: 'Invalid file! Please load an image!' }
        }
        if (!resultPicture) {
            return { statusCode: 'error', statusMessage: 'Invalid picture!' };
        }

        try {
            const hash = generateHash(10);
            const pictureLink = `api/assets/users/${userID}_${hash}.jpg`;
            resultPicture.write(this.baseURL + pictureLink);

            const updated = await this.usersService.updateProfilePicture(userID, pictureLink);
            if (updated) {
                return { statusCode: 'ok', profile_picture: pictureLink };
            }
        } catch {}

        return { statusCode: 'error', statusMessage: 'Something went wrong!' };
    }

    async addProductPicture(productID: number, pictureBase64: string): Promise<any> {
        if (!productID || !pictureBase64) {
            return { statusCode: 'error', statusMessage: 'Check userID and picture!' };
        }

        let resultPicture;
        try {
            resultPicture = await this.readPicture(pictureBase64);
        } catch (e) {
            return { statusCode: 'error', statusMessage: 'Invalid file! Please load an image!' }
        }
        if (!resultPicture) {
            return { statusCode: 'error', statusMessage: 'Invalid picture!' };
        }

        try {
            const hash = generateHash(10);
            const pictureLink = `api/assets/items/${productID}/${hash}.jpg`;
            resultPicture.write(this.baseURL + pictureLink);

            return { statusCode: 'ok' };
        } catch {}

        return { statusCode: 'error', statusMessage: 'Something went wrong!' };
    }


}
