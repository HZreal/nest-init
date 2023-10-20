import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { bullQueue } from '../constant/queue';

/**
 * 对 bull 的进一步封装，方便直接调用
 */
@Injectable()
export class QueueService {
    constructor(
        //
        @InjectQueue(bullQueue.learn.queueName)
        private readonly learnClient: Queue,
        //
        @InjectQueue(bullQueue.queue.queueName)
        private readonly queueClient: Queue,
        //
        @InjectQueue(bullQueue.user.queueName)
        private readonly userBullClient: Queue,
        //
        @InjectQueue(bullQueue.role.queueName)
        private readonly roleBullClient: Queue,
        // 默认
        @InjectQueue(bullQueue.default.queueName)
        private readonly defaultBullClient: Queue,
    ) {}

    /**
     * 发送 queue 消息
     */
    async sendQueueMsg(
        queueName = bullQueue.default.queueName,
        jobName = bullQueue.default.jobName,
        msg: object,
        opt = {},
    ) {
        switch (queueName) {
            case bullQueue.learn.queueName: {
                return await this.learnClient.add(jobName, msg, opt);
            }
            case bullQueue.queue.queueName: {
                return await this.queueClient.add(jobName, msg, opt);
            }
            case bullQueue.user.queueName: {
                return await this.userBullClient.add(jobName, msg, opt);
            }
            case bullQueue.role.queueName: {
                return await this.roleBullClient.add(jobName, msg, opt);
            }
            case bullQueue.default.queueName: {
                return await this.defaultBullClient.add(jobName, msg, opt);
            }
            default: {
                throw new Error('No Such queue name');
            }
        }
    }
}
