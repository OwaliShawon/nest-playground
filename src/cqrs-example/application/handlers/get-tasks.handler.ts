import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery } from '../queries/get-tasks.query';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(query: GetTasksQuery) {
    if (query.completed !== undefined) {
      const tasks = await this.repo.findByCompleted(query.completed);
      return tasks.map((t) => t.toObject());
    }
    const all = await this.repo.findAll();
    return all.map((t) => t.toObject());
  }
}
