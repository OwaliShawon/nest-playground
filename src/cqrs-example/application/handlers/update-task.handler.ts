import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from '../commands/update-task.command';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(command: UpdateTaskCommand) {
    const task = await this.repo.findById(command.id);
    if (!task) throw new NotFoundException('Task not found');

    if (command.title !== undefined) task.updateTitle(command.title);
    if (command.description !== undefined)
      task.updateDescription(command.description);

    const updated = await this.repo.save(task);
    return updated.toObject();
  }
}
