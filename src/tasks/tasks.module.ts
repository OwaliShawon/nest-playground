import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

/**
 * Tasks Module
 * Handles all scheduled tasks and cron jobs
 * Uses NestJS Schedule module for task scheduling
 */
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
