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
        @InjectQueue('learn') private readonly bullQueueService: Queue,
    ) {}

    /**
     * 发送 queue 消息
     */
    async sendQueueMsg(name: string, msg: object, opt = {}) {
        await this.bullQueueService.add(name, msg, opt);
    }
}
