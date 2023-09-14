/**
 * @author huang
 * @date 2023-09-14
 */
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('learn')
export class LearnProcessor {
    private readonly logger = new Logger(LearnProcessor.name);

    @Process('jobName')
    handleTranscode(job: Job) {
        this.logger.debug('Start transcoding...');

        // handle job task;

        this.logger.debug('Transcoding completed');
    }

    // @OnQueueActive()
    // onActive(job: Job) {
    //     console.log(
    //         `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    //     );
    // }
}
