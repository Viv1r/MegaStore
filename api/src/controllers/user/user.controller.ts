import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {UserGuard} from "../../guards/user/user.guard";
import {PicturesService} from "../../services/pictures/pictures.service";

@Controller('user')
export class UserController {
    constructor(private picturesService: PicturesService) {}

    @UseGuards(UserGuard)
    @Post('picture')
    async updatePicture(@Req() request: any, @Body() body: any) {
        if (!body.picture) {
            return { statusCode: 'error', statusMessage: 'Please upload a picture!' };
        }
        const id = request.user.id;
        return await this.picturesService.updateProfilePicture(id, body.picture);
    }

}
