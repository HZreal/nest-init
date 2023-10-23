/**
 * @author huang
 * @date 2023-10-20
 */
export const bullQueue = {
    learn: {
        queueName: 'queue.learn',
        jobName: { job1: 'queue.learn.job.job1', job2: 'queue.learn.job.job2' },
    },
    queue: {
        queueName: 'queue.queue',
        jobName: { job1: 'queue.queue.job.job1', job2: 'queue.queue.job.job2' },
    },
    user: {
        queueName: 'queue.user',
        jobName: { job1: 'queue.user.job.job1', job2: 'queue.user.job.job2' },
    },
    role: {
        queueName: 'queue.role',
        jobName: { job1: 'queue.role.job.job1', job2: 'queue.role.job.job2' },
    },
    // 默认队列
    default: {
        queueName: 'queue.default',
        jobName: 'default',
    },
};
