import {Controller, Get, Redirect} from '@nestjs/common';

@Controller('crm')
export class CrmController {
    @Redirect("http://25.51.146.92:4200", 301)
    @Get()
    goToCRM() {}
}
