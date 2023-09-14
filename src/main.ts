import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { loggerFunctionMiddleware } from './common/middleware/loggerMiddleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // 注册全局中间件(要求是函数)
    // app.use(loggerFunctionMiddleware);

    //
    app.useGlobalPipes(
        new ValidationPipe({
            // 禁用响应详细的错误信息
            // disableErrorMessages: true,
            // Stripping properties
            // whitelist: true,
            // Transform payload objects
            // transform: true,
        }),
    );

    await app.listen(3001);
}
bootstrap();
