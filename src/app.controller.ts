import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { LearnService } from './learn/learn.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/nest/doc')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/' };
        }
    }
}

@Controller('/test')
export class TestController {
    constructor(private readonly learnService: LearnService) {}
    @Get('/sendQueueMsg')
    async sendQueueMsg() {
        await this.learnService.sendQueueMsg();
    }

    @Get('/operateCache')
    async operateCache() {
        await this.learnService.getAndSetCache();
    }
}

@Controller('/index')
export class IndexController {
    @Get('/')
    getIndex(): string {
        return 'index page';
    }
}
