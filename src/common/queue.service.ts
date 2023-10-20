import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

/**
 * 对 bull 的进一步封装，方便直接调用
 */
@Injectable()
export class QueueService {
    constructor(
        //
        @InjectQueue('queue') private readonly queueClient: Queue,
        @InjectQueue('user') private readonly userBullClient: Queue,
        @InjectQueue('role') private readonly roleBullClient: Queue,
    ) {}

    /**
     * 发送 queue 消息
     */
    async sendQueueMsg(
        queueName = 'default',
        jobName = 'default',
        msg: object,
        opt = {},
    ) {
        switch (queueName) {
            case 'queue': {
                return await this.queueClient.add(jobName, msg, opt);
            }
            case 'user': {
                return await this.userBullClient.add(jobName, msg, opt);
            }
            case 'role': {
                return await this.roleBullClient.add(jobName, msg, opt);
            }
        }
    }
}
