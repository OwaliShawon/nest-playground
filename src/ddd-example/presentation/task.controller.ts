import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { TaskService } from '../application/services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../application/dto/task.dto';

/**
 * REST Controller for Tasks
 * This is a DRIVING adapter (uses application services)
 */
@Controller('ddd/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll(@Query('completed') completed?: string) {
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      return this.taskService.getTasksByStatus(isCompleted);
    }
    return this.taskService.getAllTasks();
  }

  @Get('count')
  async count() {
    const count = await this.taskService.getTaskCount();
    return { count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.getTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.updateTask(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    const task = await this.taskService.completeTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Patch(':id/uncomplete')
  async uncomplete(@Param('id') id: string) {
    const task = await this.taskService.uncompleteTask(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.taskService.deleteTask(id);
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
