import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTaskCommand } from '../commands/complete-task.command';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(command: CompleteTaskCommand) {
    const task = await this.repo.findById(command.id);
    if (!task) throw new NotFoundException('Task not found');

    task.complete();
    const updated = await this.repo.save(task);
    return updated.toObject();
  }
}
