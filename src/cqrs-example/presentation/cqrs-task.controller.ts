import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '../application/commands/create-task.command';
import { UpdateTaskCommand } from '../application/commands/update-task.command';
import { CompleteTaskCommand } from '../application/commands/complete-task.command';
import { UncompleteTaskCommand } from '../application/commands/uncomplete-task.command';
import { DeleteTaskCommand } from '../application/commands/delete-task.command';
import { GetTaskQuery } from '../application/queries/get-task.query';
import { GetTasksQuery } from '../application/queries/get-tasks.query';
import { GetTaskCountQuery } from '../application/queries/get-task-count.query';

@Controller('cqrs/tasks')
export class CqrsTaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: { title: string; description: string }) {
    return this.commandBus.execute(
      new CreateTaskCommand(body.title, body.description),
    );
  }

  @Get()
  async findAll(@Query('completed') completed?: string) {
    return this.queryBus.execute(
      new GetTasksQuery(completed !== undefined ? completed === 'true' : undefined),
    );
  }

  @Get('count')
  async count() {
    return this.queryBus.execute(new GetTaskCountQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetTaskQuery(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string },
  ) {
    return this.commandBus.execute(
      new UpdateTaskCommand(id, body.title, body.description),
    );
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    return this.commandBus.execute(new CompleteTaskCommand(id));
  }

  @Patch(':id/uncomplete')
  async uncomplete(@Param('id') id: string) {
    return this.commandBus.execute(new UncompleteTaskCommand(id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
