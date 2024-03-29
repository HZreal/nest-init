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
        if (version && version === '9') {
            return { url: 'https://docs.nestjs.com/v9/' };
        }
    }
}

@Controller('/test')
export class TestController {
    constructor(private readonly learnService: LearnService) {}
    @Get('/sendMsg')
    async sendQueueMsg() {
        // await this.learnService.sendQueueMsg();
        await this.learnService.sendMsg();
        return { code: 0, message: {} };
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
