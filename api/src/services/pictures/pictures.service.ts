import { Injectable } from '@nestjs/common';
import jimp from 'jimp';
import { generateHash } from "../../modules/hashgen";
import { UsersService } from "../users/users.service";

@Injectable()
export class PicturesService {
    constructor(private usersService: UsersService) {}

    readonly baseURL = 'dist/public/';

    async updateProfilePicture(userID: number, pictureBase64: string): Promise<any> {
        if (!userID || !pictureBase64) {
            return { statusCode: 'error', statusMessage: 'Check userID and picture!' };
        }

        let resultPicture; // Сюда отправляется аватарка, если загружена и валидна
        try {
            const img = await jimp.read(
                Buffer.from(pictureBase64, 'base64')
            );
            const [width, height] = [img.bitmap.width, img.bitmap.height];
            if (!width || !height) {
                return { statusCode: 'error', statusMessage: 'Invalid picture!' };
            }

            // Обрезка до пропорций 1:1
            if (width > height) {
                resultPicture = img.crop((width-height)/2, 0, height*0.99, height*0.99);
            } else {
                resultPicture = img.crop(0, (height-width)/2, width*0.99, width*0.99);
            }
        } catch (e) {
            return { statusCode: 'error', statusMessage: 'Invalid file! Please load an image!' }
        }

        if (resultPicture) {
            try {
                const hash = generateHash(10);
                const pictureLink = `api/assets/users/${userID}_${hash}.jpg`;
                resultPicture.write(this.baseURL + pictureLink);

                const updated = await this.usersService.updateProfilePicture(userID, pictureLink);
                if (updated) {
                    return { statusCode: 'ok', profile_picture: pictureLink };
                }
            } catch {}
        }
        return { statusCode: 'error', statusMessage: 'Something went wrong!' };
    }
}
