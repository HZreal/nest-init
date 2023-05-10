import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController, IndexController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from './common/middleware/loggerMiddleware';

import { ConfigModule, ConfigService } from '@nestjs/config';
import custom, { customConfiguration } from './config/custom';
import { ConfigurationKeyPaths, getConfiguration } from './config/configExtra';
import yamlConfig from './config/yamlConfig';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { LearnModule } from './learn/learn.module';

@Module({
    // 新建一个子模块需要在此注册
    imports: [
        // 当导入了 Module 时，Module 内部的 Controller Service 不再需要在下面注册
        LearnModule,

        /*
         * 配置 module
         * */
        ConfigModule.forRoot({
            // envFilePath: '.development.env', // 指定 .env 文件的路径，默认为根目录的 .env , 当配置文件和环境变量存在同样的 key 时，环境变量的优先
            envFilePath: ['.env.development', '.env.local'], // 指定多个路径的配置文件，出现同样的 key 时，优先取前面的
            ignoreEnvFile: true, // 禁用.env文件加载，禁用时设置的路径均无效。即仅从运行时环境访问环境变量 (export DB_USER=test)
            isGlobal: true, // 声明为全局模块，则其他模块使用此模块时无需再导入此模块
            load: [custom, customConfiguration, yamlConfig, getConfiguration],
        }),

        /*
         * typeorm module
         * */
        // TypeOrmModule.forRoot({
        //     type: 'postgres',
        //     host: '192.168.1.7',
        //     port: 5432,
        //     username: 'postgres',
        //     password: 'szkj1234567890',
        //     database: 'ttest',
        //     // entities: [User],
        //     autoLoadEntities: true,
        //     // synchronize: true,
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (
                configService: ConfigService<ConfigurationKeyPaths>,
                // loggerOptions: LoggerModuleOptions,
            ) => ({
                autoLoadEntities: true,
                type: 'postgres',
                // type: configService.get<any>('database.type'),
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                synchronize: configService.get<boolean>('database.synchronize'),
                logging: configService.get('database.logging'),
                // timezone: configService.get('database.timezone'), // 出错

                // 自定义日志
                // logger: new TypeORMLoggerService(
                //     configService.get('database.logging'),
                //     loggerOptions,
                // ),
            }),
            inject: [ConfigService],
        }),
    ],
    // 模块内的控制器需要在此注册
    // 若注册了 module，则 module 中的 Controller、Service 不再需要注册
    controllers: [AppController, IndexController],
    // 模块内的服务需要在此注册
    providers: [AppService],
})
export class AppModule implements NestModule {
    /*
     *
     * */
    constructor(private dataSource: DataSource) {}

    /*
     * 配置中间件
     * */
    configure(consumer: MiddlewareConsumer) {
        // '/' 表示应用到所有路由
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
