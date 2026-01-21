import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

/**
 * Tasks Service
 * Provides scheduled task management and execution
 *
 * Best Practices:
 * 1. Use descriptive names for scheduled tasks
 * 2. Add logging for debugging and monitoring
 * 3. Handle errors gracefully
 * 4. Use timezone for cron expressions
 * 5. Document the purpose and schedule of each task
 */
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    /**
     * Runs every 10 seconds
     * Use @Interval for fixed-delay scheduling
     */
    @Interval(10000)
    handleInterval() {
        this.logger.debug('Called every 10 seconds');
    }

    /**
     * Runs after 5 seconds from application startup
     * Use @Timeout for one-time delayed execution
     */
    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Called once after 5 seconds');
    }

    /**
     * Runs every day at 2:30 AM
     * Standard cron expression: (minute hour day month dayOfWeek)
     * 30 2 * * * = 2:30 AM every day
     */
    @Cron('30 2 * * *')
    handleDailyMaintenance() {
        this.logger.log('Daily maintenance task started');
        try {
            // Add your maintenance logic here
            // Examples: database cleanup, report generation, cache refresh
            this.logger.log('Daily maintenance task completed successfully');
        } catch (error) {
            this.logger.error('Daily maintenance task failed', error);
        }
    }

    /**
     * Runs every Monday at 9:00 AM
     * 0 9 * * 1 = 9:00 AM every Monday
     */
    @Cron('0 9 * * 1')
    handleWeeklyReport() {
        this.logger.log('Weekly report generation started');
        try {
            // Add your weekly task logic here
            // Examples: generate reports, send notifications, archive data
            this.logger.log('Weekly report generated successfully');
        } catch (error) {
            this.logger.error('Weekly report generation failed', error);
        }
    }

    /**
     * Runs every 1st day of month at 00:00
     * 0 0 1 * * = Midnight on the 1st of every month
     */
    @Cron('0 0 1 * *')
    handleMonthlyAggregation() {
        this.logger.log('Monthly data aggregation started');
        try {
            // Add your monthly task logic here
            // Examples: monthly summary, billing cycle, reset metrics
            this.logger.log('Monthly data aggregation completed');
        } catch (error) {
            this.logger.error('Monthly data aggregation failed', error);
        }
    }

    /**
     * Using predefined cron expressions
     * CronExpression enum provides common patterns
     */
    @Cron(CronExpression.EVERY_HOUR)
    handleHourlySync() {
        this.logger.debug('Hourly sync started');
        try {
            // Add your hourly sync logic here
            this.logger.debug('Hourly sync completed');
        } catch (error) {
            this.logger.error('Hourly sync failed', error);
        }
    }
}
