/**
 * @author huang
 * @date 2023-09-14
 */
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { LearnService } from './learn.service';

@Processor('queue')
export class LearnProcessor {
    private readonly logger = new Logger(LearnProcessor.name);

    constructor(private learnService: LearnService) {}

    @Process('jobName')
    async gotMessage(job: Job) {
        this.logger.verbose('Start handling...');

        // handle job task message;
        await this.learnService.handleJobTaskMessage(job.data);

        this.logger.verbose('handle completed');
    }

    // @OnQueueActive()
    // onActive(job: Job) {
    //     console.log(
    //         `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    //     );
    // }
}
