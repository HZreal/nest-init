import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LearnController } from './learn.controller';
import { LearnService } from './learn.service';
import {
    LoggerClassMiddleware,
    loggerFunctionMiddleware,
} from '../common/middleware/loggerMiddleware';

@Module({
    controllers: [LearnController],
    providers: [LearnService],
})
export class LearnModule implements NestModule {
    /*
     * 配置中间件
     * */
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerClassMiddleware, loggerFunctionMiddleware)
            // .exclude(
            //     { path: 'learn', method: RequestMethod.GET },
            //     { path: 'learn', method: RequestMethod.POST },
            //     'learn/(.*)',
            // )
            .forRoutes('/learn');
        // .forRoutes({ path: 'learn', method: RequestMethod.GET });
        // .forRoutes(LearnController);
    }
}
