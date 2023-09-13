/**
 * @author sizhong
 * @date 2023-05-08
 * 自定义命名空间的配置
 */

/*
 * 注册一个 custom 命名空间的配置
 * */

export default () => ({
    // jwt
    jwt: {
        secret: process.env.JWT_SECRET || '123456',
    },

    // typeorm config
    pg: {
        type: 'postgres',
        host: process.env.DATABASE_HOST || '192.168.1.7',
        port: parseInt(process.env.PG_PORT, 10) || 5432,
        username: process.env.PG_USERNAME || 'postgres',
        password:
            process.env.PG_PASSWORD ||
            process.env.PG_ROOT_PASSWORD ||
            'szkj1234567890',
        database: process.env.PG_DATABASE || 'ttest',
        // entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
        // migrations: ['dist/src/migrations/**/*.js'],
        autoLoadEntities: true,
        /** https://typeorm.io/migrations */
        // synchronize: true,
        // logging: ['error'],
        timezone: '+08:00', // 东八区
        // cli: {
        //     migrationsDir: 'src/migrations',
        // },
    },

    // redis
    redis: {},
});
