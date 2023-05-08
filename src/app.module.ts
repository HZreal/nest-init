import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController, IndexController } from './app.controller';
import { AppService } from './app.service';
import { LearnController } from './learn/learn.controller';
import { LearnService } from './learn/learn.service';
import { LearnModule } from './learn/learn.module';
import { LoggerMiddleware } from './common/middleware/loggerMiddleware';

@Module({
    // 新建一个子模块需要在此注册
    imports: [LearnModule],
    // 模块内的控制器需要在此注册
    controllers: [AppController, IndexController, LearnController],
    // 模块内的服务需要在此注册
    providers: [AppService, LearnService],
})
export class AppModule implements NestModule {
    /*
     * 配置中间件
     * */
    configure(consumer: MiddlewareConsumer) {
        // '/' 表示应用到所有路由
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
