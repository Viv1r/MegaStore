import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {UserGuard} from "../../guards/user/user.guard";
import {PicturesService} from "../../services/pictures/pictures.service";
import {MailService} from "../../services/mail/mail.service";
import {UsersService} from "../../services/users/users.service";

@Controller('user')
export class UserController {
    constructor(private picturesService: PicturesService, private usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Post('picture')
    async updatePicture(@Req() request: any, @Body() body: any) {
        if (!body.picture) {
            return { statusCode: 'error', statusMessage: 'Please upload a picture!' };
        }
        const id = request.user.id;
        return await this.picturesService.updateProfilePicture(id, body.picture);
    }

    @UseGuards(UserGuard)
    @Post('update')
    async updateData(@Req() request: any, @Body() { name, password, oldPassword }) {
        const user = request.user;

        if (password) {
            if (!oldPassword) {
                return { statusCode: 'error', statusMessage: 'Please specify the old password!' };
            }
            const updated = await this.usersService.updatePassword(user.id, oldPassword, password);
            if (!updated) {
                return { statusCode: 'error', statusMessage: 'Wrong password!' };
            }
        }
        if (name) {
            await this.usersService.updateName(user.id, name);
        }

        return { statusCode: 'ok' };
    }
}
