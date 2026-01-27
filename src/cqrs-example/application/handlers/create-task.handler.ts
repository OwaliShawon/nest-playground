import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../commands/create-task.command';
import { TASK_REPOSITORY } from '../../../ddd-example/application/ports/task.repository';
import type { TaskRepository } from '../../../ddd-example/application/ports/task.repository';
import { Task } from '../../../ddd-example/domain/entities/task.entity';
import { TaskId } from '../../../ddd-example/domain/value-objects/task-id.vo';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(command: CreateTaskCommand) {
    const id = TaskId.generate();
    const task = Task.create(id.toString(), command.title, command.description);
    const saved = await this.repo.save(task);
    return saved.toObject();
  }
}
