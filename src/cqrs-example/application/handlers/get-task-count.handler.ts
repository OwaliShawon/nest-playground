import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskCountQuery } from '../queries/get-task-count.query';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@QueryHandler(GetTaskCountQuery)
export class GetTaskCountHandler implements IQueryHandler<GetTaskCountQuery> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute() {
    const count = await this.repo.count();
    return { count };
  }
}
