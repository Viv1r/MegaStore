import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutController {

    @Post()
    logout(@Res({ passthrough: true }) response: Response): object {
        response.clearCookie('token');
        return { statusCode: 'ok' };
    }
    
}
