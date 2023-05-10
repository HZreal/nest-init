/**
 * @author sizhong
 * @date 2023-05-08
 */

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

/*
 * 参考：https://github.com/buqiyuan/nest-admin/blob/main/src/config/configuration.ts
 * */

// export const aa = () => ({} as const);
export const getConfiguration = () =>
    ({
        rootRoleId: parseInt(process.env.ROOT_ROLE_ID || '1'),
        // nodemailer config
        mailer: {
            host: 'xxx',
            port: 80,
            auth: {
                user: 'xxx',
                pass: 'xxx',
            },
            secure: false, // or true using 443
        },
        // amap config
        amap: {
            key: 'xxx',
        },
        // jwt sign secret
        jwt: {
            secret: process.env.JWT_SECRET || '123456',
        },
        // typeorm config
        database: {
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
        } as PostgresConnectionOptions,
        // redis: {
        //     host: process.env.REDIS_HOST, // default value
        //     port: parseInt(process.env.REDIS_PORT, 10), // default value
        //     password: process.env.REDIS_PASSWORD,
        //     db: process.env.REDIS_DB,
        // },
        // qiniu config
        // qiniu: {
        //     accessKey: process.env.QINIU_ACCESSKEY,
        //     secretKey: process.env.QINIU_SECRETKEY,
        //     domain: process.env.QINIU_DOMAIN,
        //     bucket: process.env.QINIU_BUCKET,
        //     zone: parseZone(process.env.QINIU_ZONE || 'Zone_z2'),
        //     access: (process.env.QINIU_ACCESS_TYPE as any) || 'public',
        // },
        // logger config
        logger: {
            timestamp: false,
            dir: process.env.LOGGER_DIR,
            maxFileSize: process.env.LOGGER_MAX_SIZE,
            maxFiles: process.env.LOGGER_MAX_FILES,
            errorLogName: process.env.LOGGER_ERROR_FILENAME,
            appLogName: process.env.LOGGER_APP_FILENAME,
        },
        // swagger
        swagger: {
            enable: process.env.SWAGGER_ENABLE === 'true',
            path: process.env.SWAGGER_PATH,
            title: process.env.SWAGGER_TITLE,
            desc: process.env.SWAGGER_DESC,
            version: process.env.SWAGGER_VERSION,
        },
    } as const);

export type ConfigurationType = ReturnType<typeof getConfiguration>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ConfigurationKeyPaths = Record<NestedKeyOf<ConfigurationType>, any>;
