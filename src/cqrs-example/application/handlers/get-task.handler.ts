import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTaskQuery } from '../queries/get-task.query';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(query: GetTaskQuery) {
    const task = await this.repo.findById(query.id);
    if (!task) throw new NotFoundException('Task not found');
    return task.toObject();
  }
}
