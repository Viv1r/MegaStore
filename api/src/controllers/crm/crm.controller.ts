import {Controller, Get, Redirect} from '@nestjs/common';

@Controller('crm')
export class CrmController {
    @Redirect("http://192.168.31.22:4200", 301)
    @Get()
    goToCRM() {}
}
