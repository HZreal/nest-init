import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { loggerFunctionMiddleware } from './common/middleware/loggerMiddleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 注册全局中间件(要求是函数)
    // app.use(loggerFunctionMiddleware);

    await app.listen(3000);
}
bootstrap();
