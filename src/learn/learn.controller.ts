import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Req,
    Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateuserDto } from './dto/learn.dto';
import { LearnService } from './learn.service';
import { ConfigService } from '@nestjs/config';
import custom from '../config/customConfig';

/*
创建命令： nest g controller learn
 */

@Controller('/learn')
export class LearnController {
    /*
     * 服务注入
     * */
    constructor(
        private learnService: LearnService,
        private configService: ConfigService,
    ) {}

    @Get('/params')
    async params(@Query() query) {
        console.log('query  ---->  ', query);
        return query;
    }

    @Get('/body')
    async body(@Body() body) {
        console.log('body  ---->  ', body);
        return body;
    }

    @Get('/request')
    async request(@Req() request: Request) {
        // express原生的请求对象request
        // 具有查询字符串，请求参数参数，HTTP 标头（HTTP header） 和 正文（HTTP body）的属性
        // 但通常用装饰器获取
        return request.path;
    }

    @Get('/response')
    async response(@Res() res: Response) {
        // express原生的响应对象response
        res.status(HttpStatus.OK).json([]);
    }

    @Get('/invokeService')
    async invokeService() {
        const data = await this.learnService.findAll();
        return {
            code: 0,
            msg: 'OK',
            data: data,
        };
    }

    @Post('/create')
    async create(@Body() createuserDto: CreateuserDto) {
        return {
            name: createuserDto.name,
            age: createuserDto.age,
            breed: createuserDto.breed,
        };
    }

    @Get('/getConfig')
    async getConfig() {
        const DATABASE_USER =
            this.configService.get<string>('DATABASE_USER') ?? null;
        const DATABASE_HOST =
            this.configService.get<string>('DATABASE_HOST') ?? null;
        const aaa = this.configService.get<string>('custom.aaa') ?? null;
        const bbb =
            this.configService.get<string>('configuration.http.port') ?? null;

        const pg =
            this.configService.get<string>('customConfiguration.pg') ?? null;
        return { DATABASE_USER, DATABASE_HOST, aaa, bbb, pg };
    }
}
