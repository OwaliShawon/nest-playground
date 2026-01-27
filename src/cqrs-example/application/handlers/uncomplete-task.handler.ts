import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UncompleteTaskCommand } from '../commands/uncomplete-task.command';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@CommandHandler(UncompleteTaskCommand)
export class UncompleteTaskHandler
  implements ICommandHandler<UncompleteTaskCommand>
{
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(command: UncompleteTaskCommand) {
    const task = await this.repo.findById(command.id);
    if (!task) throw new NotFoundException('Task not found');

    task.uncomplete();
    const updated = await this.repo.save(task);
    return updated.toObject();
  }
}
