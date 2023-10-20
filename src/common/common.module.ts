import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';
import { bullQueue } from '../constant/queue';

@Module({
    imports: [
        //
        BullModule.registerQueue(
            {
                name: bullQueue.learn.queueName,
            },
            {
                name: bullQueue.queue.queueName,
            },
            {
                name: bullQueue.user.queueName,
            },
            {
                name: bullQueue.role.queueName,
            },
            {
                name: bullQueue.default.queueName,
            },
        ),
    ],
    providers: [CommonService, QueueService],
    exports: [CommonService, QueueService],
})
export class CommonModule {}
