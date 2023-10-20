import { Test, TestingModule } from '@nestjs/testing';
import { LearnService } from './learn.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './learn.entity';
import { BullModule, getQueueToken } from '@nestjs/bull';
import { DataSource, Repository } from 'typeorm';
import { Queue } from 'bull';
import { Query } from '@nestjs/common';

describe('LearnService', () => {
    let service: LearnService;
    let dataSource: DataSource;
    let usersRepository: Repository<UserEntity>;
    let audioQueue: Queue;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                BullModule.registerQueue({
                    name: 'learn',
                }),
            ],
            providers: [
                LearnService,
                {
                    provide: getRepositoryToken(UserEntity), // 使用 @InjectRepository 提供的令牌
                    useClass: Repository, // 使用真实的 Repository 类或其模拟版本
                },
                {
                    provide: DataSource,
                    useValue: {}, // 使用一个空对象或者模拟 DataSource
                },
                // {
                //     provide: getQueueToken('learn'), // 使用 @InjectQueue 提供的令牌
                //     useClass: Query, // 使用真实的 Queue 类或其模拟版本
                // },
            ],
        }).compile();

        service = module.get<LearnService>(LearnService);
        // usersRepository = module.get<Repository<User>>(
        //     getRepositoryToken(User),
        // );
        // dataSource = module.get<DataSource>(DataSource);
        // audioQueue = module.get<Queue>(getQueueToken('learn'));
    });

    it('should be defined', async () => {
        expect(await service.sendQueueMsg()).toEqual(123);
    }, 10000);
});
