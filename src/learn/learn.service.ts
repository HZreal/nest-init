import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './learn.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueueService } from '../common/queue.service';
import { bullQueue } from '../constant/queue';

@Injectable()
export class LearnService {
    constructor(
        //
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        //
        private dataSource: DataSource,

        // 声明调用 Cache
        @Inject(CACHE_MANAGER) private cacheManager: Cache,

        // 声明调用 bull (这里声明的 queue name 必须与 module 中注册的一致)
        // @InjectQueue(bullQueue.learn.queueName)
        // private readonly queueBullClient: Queue,

        // 声明自定义 CommonModule 中的 QueueService(对 bull 的封装)
        private queueService: QueueService,
    ) {}

    /**
     * 使用事务
     * @param users
     */
    async useTransaction(users: any[]) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);

            // 提交
            await queryRunner.commitTransaction();
        } catch (err) {
            // 回滚
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }

    /**
     * 直接调用 Bull 发送 queue 消息
     */
    async sendQueueMsg() {
        // await this.queueBullClient.add(
        //     bullQueue.learn.jobName.job1,
        //     {
        //         foo: 'bar',
        //     },
        // );
    }

    /**
     * 调用 QueueService (间接调用 bull) 发送 queue 消息
     */
    async sendMsg() {
        await this.queueService.sendQueueMsg(
            bullQueue.learn.queueName,
            bullQueue.learn.jobName.job1,
            {
                foo: 'bar',
            },
        );
    }

    /**
     * 对监听消息进行处理
     * @param msg
     */
    async handleJobTaskMessage(msg) {
        console.log('msg  ---->  ', msg);
    }

    async getAndSetCache() {
        // set
        await this.cacheManager.set('key', 'value', 1000);
        // get
        const value = await this.cacheManager.get('key');
        console.log('value  ---->  ', value);
        // delete
        await this.cacheManager.del('key');
        // clear the entire cache
        await this.cacheManager.reset();
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
