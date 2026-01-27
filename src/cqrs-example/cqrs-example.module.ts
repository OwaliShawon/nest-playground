import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DddExampleModule } from '../ddd-example/ddd-example.module';
import { CqrsTaskController } from './presentation/cqrs-task.controller';
import { CreateTaskHandler } from './application/handlers/create-task.handler';
import { UpdateTaskHandler } from './application/handlers/update-task.handler';
import { CompleteTaskHandler } from './application/handlers/complete-task.handler';
import { UncompleteTaskHandler } from './application/handlers/uncomplete-task.handler';
import { DeleteTaskHandler } from './application/handlers/delete-task.handler';
import { GetTaskHandler } from './application/handlers/get-task.handler';
import { GetTasksHandler } from './application/handlers/get-tasks.handler';
import { GetTaskCountHandler } from './application/handlers/get-task-count.handler';

/**
 * CQRS Example Module
 *
 * This module demonstrates the CQRS (Command Query Responsibility Segregation)
 * pattern using NestJS @nestjs/cqrs. It reuses the DDD domain entities and
 * the task repository infrastructure from ddd-example.
 *
 * Key concepts:
 * - Commands: Actions that modify state (CreateTask, UpdateTask, etc.)
 * - Queries: Read-only operations (GetTask, GetTasks, etc.)
 * - Handlers: Execute commands and queries, returning results
 * - CommandBus/QueryBus: Route commands/queries to their handlers
 *
 * Usage:
 * POST   /cqrs/tasks                - Create task (command)
 * GET    /cqrs/tasks                - Get all tasks (query)
 * GET    /cqrs/tasks/:id            - Get task by ID (query)
 * PUT    /cqrs/tasks/:id            - Update task (command)
 * PATCH  /cqrs/tasks/:id/complete   - Complete task (command)
 * PATCH  /cqrs/tasks/:id/uncomplete - Uncomplete task (command)
 * DELETE /cqrs/tasks/:id            - Delete task (command)
 * GET    /cqrs/tasks/count          - Get task count (query)
 */
@Module({
  imports: [CqrsModule, DddExampleModule],
  controllers: [CqrsTaskController],
  providers: [
    // Command Handlers
    CreateTaskHandler,
    UpdateTaskHandler,
    CompleteTaskHandler,
    UncompleteTaskHandler,
    DeleteTaskHandler,
    // Query Handlers
    GetTaskHandler,
    GetTasksHandler,
    GetTaskCountHandler,
  ],
})
export class CqrsExampleModule {}
