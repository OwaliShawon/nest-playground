# Tasks Module - Scheduler

This module provides scheduled task management using NestJS Schedule module.

## Overview

The Tasks module uses `@nestjs/schedule` to handle cron jobs, intervals, and timeouts in the application.

## Installation

The `@nestjs/schedule` package is already included in dependencies.

## Usage

### 1. Importing the Module

Add `TasksModule` to your `AppModule`:

```typescript
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, /* other modules */],
})
export class AppModule {}
```

### 2. Scheduling Methods

#### Using `@Cron()` Decorator

Schedule tasks using cron expressions:

```typescript
@Cron('0 0 * * *') // Daily at midnight
handleDailyTask() {
  // Your logic here
}
```

#### Using `@Interval()` Decorator

Execute tasks at fixed intervals (in milliseconds):

```typescript
@Interval(10000) // Every 10 seconds
handleInterval() {
  // Your logic here
}
```

#### Using `@Timeout()` Decorator

Execute task once after delay:

```typescript
@Timeout(5000) // After 5 seconds from startup
handleTimeout() {
  // Your logic here
}
```

## Cron Expression Format

Standard cron format: `second minute hour day month dayOfWeek`

Examples:
- `0 0 * * *` - Daily at midnight
- `0 9 * * 1` - Every Monday at 9 AM
- `30 2 * * *` - Daily at 2:30 AM
- `0 0 1 * *` - First day of month at midnight
- `*/5 * * * *` - Every 5 minutes

## Predefined Cron Expressions

NestJS provides `CronExpression` enum:

```typescript
import { CronExpression } from '@nestjs/schedule';

@Cron(CronExpression.EVERY_HOUR)
handleHourlyTask() { }

@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
handleDailyTask() { }
```

## Best Practices

1. **Error Handling**: Always wrap task logic in try-catch blocks
2. **Logging**: Use Logger for monitoring and debugging
3. **Descriptive Names**: Use clear method names that describe the task
4. **Documentation**: Comment each scheduled task with its purpose
5. **Timezone Consideration**: Be aware of server timezone for cron jobs
6. **Performance**: Avoid long-running tasks that may overlap
7. **Testing**: Test scheduled tasks in isolation

## Example: Real-World Scenarios

### Data Cleanup
```typescript
@Cron('0 3 * * *') // 3 AM daily
async cleanupOldLogs() {
  // Delete logs older than 30 days
}
```

### Report Generation
```typescript
@Cron('0 9 * * 1') // 9 AM every Monday
async generateWeeklyReport() {
  // Generate and send reports
}
```

### Cache Refresh
```typescript
@Interval(3600000) // Every hour
async refreshCache() {
  // Refresh critical cache data
}
```

### Health Check
```typescript
@Interval(300000) // Every 5 minutes
async healthCheck() {
  // Verify database, external services connectivity
}
```

## Monitoring

Get scheduler status:

```typescript
constructor(private tasksService: TasksService) {}

async checkStatus() {
  const status = this.tasksService.getSchedulerStatus();
  console.log(status);
}
```

## Timezone Support

To use timezone with cron:

```typescript
@Cron('0 0 * * *', {
  timeZone: 'America/New_York',
})
handleDailyTask() { }
```

## Manual Task Execution

Call scheduled methods manually from other services:

```typescript
constructor(private tasksService: TasksService) {}

async triggerCleanup() {
  await this.tasksService.cleanupExpiredData();
}
```

## Disabling Scheduler in Tests

```typescript
beforeEach(async () => {
  const module = await Test.createTestingModule({
    imports: [ScheduleModule.forRoot()],
  }).compile();
});
```

## References

- [NestJS Schedule Documentation](https://docs.nestjs.com/techniques/task-scheduling)
- [Cron Expression Format](https://en.wikipedia.org/wiki/Cron)
