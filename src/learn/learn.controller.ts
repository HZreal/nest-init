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
import { CreateCatDto } from './dto/learn.dto';

/*
创建命令： nest g controller learn
 */

@Controller('/learn')
export class LearnController {
    @Get('/params')
    params(@Query() query) {
        console.log('query  ---->  ', query);
        return {};
    }

    @Get('/body')
    body(@Body() body) {
        console.log('query  ---->  ', body);
        return {};
    }

    @Get('/request')
    request(@Req() request: Request): string {
        // express原生的请求对象request
        // 具有查询字符串，请求参数参数，HTTP 标头（HTTP header） 和 正文（HTTP body）的属性
        // 但通常用装饰器获取
        return request.path;
    }

    @Get('/response')
    response(@Res() res: Response) {
        // express原生的响应对象response
        res.status(HttpStatus.OK).json([]);
    }

    @Post('/create')
    async create(@Body() createCatDto: CreateCatDto) {
        return {
            name: createCatDto.name,
            age: createCatDto.age,
            breed: createCatDto.breed,
        };
    }
}
