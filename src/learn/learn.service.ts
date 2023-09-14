import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './learn.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UpdateUserDto } from './dto/update-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LearnService {
    constructor(
        //
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        //
        private dataSource: DataSource,

        //
        @Inject(CACHE_MANAGER) private cacheManager: Cache,

        //
        @InjectQueue('learn') private readonly audioQueue: Queue,
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

            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }
    }

    /**
     * 发送 queue 消息
     */
    async sendQueueMsg() {
        const job = await this.audioQueue.add('jobName', {
            foo: 'bar',
        });
        console.log('job  ---->  ', job);
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
