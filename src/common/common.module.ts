import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        //
        BullModule.registerQueue(
            {
                name: 'learn',
            },
            {
                name: 'learn2',
            },
        ),
    ],
    providers: [CommonService, QueueService],
    exports: [CommonService, QueueService],
})
export class CommonModule {}
