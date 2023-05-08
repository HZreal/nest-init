import { Module } from '@nestjs/common';
import { AppController, IndexController } from './app.controller';
import { AppService } from './app.service';
import { LearnController } from './learn/learn.controller';
import { LearnService } from './learn/learn.service';
import { LearnModule } from './learn/learn.module';

@Module({
    // 新建一个子模块需要在此注册
    imports: [LearnModule],
    // 模块内的控制器需要在此注册
    controllers: [AppController, IndexController, LearnController],
    // 模块内的服务需要在此注册
    providers: [AppService, LearnService],
})
export class AppModule {}
