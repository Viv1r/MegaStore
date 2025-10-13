import {Body, Controller, HttpException, Post, Req, UseGuards} from '@nestjs/common';
import {UserGuard} from "../../guards/user/user.guard";
import {PicturesService} from "../../services/pictures/pictures.service";
import {UsersService} from "../../services/users/users.service";

@Controller('user')
export class UserController {
    constructor(private picturesService: PicturesService, private usersService: UsersService) {}

    @UseGuards(UserGuard)
    @Post('picture')
    async updatePicture(@Req() request: any, @Body() body: any) {
        if (!body.picture) {
            throw new HttpException('Please upload a picture!', 400);
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
                throw new HttpException('Please specify the old password!', 400);
            }
            const updated = await this.usersService.updatePassword(user.id, oldPassword, password);
            if (!updated) {
                throw new HttpException('Wrong password!', 400);
            }
        }
        if (name) {
            await this.usersService.updateName(user.id, name);
        }

        return { statusCode: 'ok' };
    }
}
