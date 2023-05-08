/**
 * @author sizhong
 * @date 2023-05-08
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/*
 * 类式写法的中间件
 * */
@Injectable()
export class LoggerClassMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`class middleware...`);
        next();
    }
}

/*
 * 函数式写法的中间件
 * */
export function loggerFunctionMiddleware(req, res, next) {
    console.log(`function middleware...`);
    next();
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();

        next();

        const endTime = Date.now();

        console.log(
            `Request: ${endTime} ${req.method}  ${req.path}  rt=${
                endTime - startTime
            }ms`,
        );
    }
}
