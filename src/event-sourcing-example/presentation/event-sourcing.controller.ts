import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventSourcingService } from '../application/services/event-sourcing.service';
import { TaskReadModelProjection } from '../application/projections/task-read-model.projection';
import { CreateTaskDto, UpdateTaskDto } from '../application/services/event-sourcing.service';

/**
 * Event Sourcing Controller
 *
 * Demonstrates:
 * - Command pattern (POST/PUT/PATCH/DELETE)
 * - Query pattern (GET)
 * - Event replay and rehydration (transparent to client)
 * - Event history/audit trail
 */
@Controller('event-sourcing/tasks')
export class EventSourcingController {
  constructor(
    private readonly eventSourcingService: EventSourcingService,
    private readonly readModel: TaskReadModelProjection,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto) {
    const id = `task_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const result = await this.eventSourcingService.createTask(id, dto);
    
    // Update read model
    const allEvents = await (this.eventSourcingService as any).eventStore.getEvents(id);
    for (const event of allEvents) {
      this.readModel.projectEvent(event);
    }
    
    return result;
  }

  @Get()
  async findAll(@Query('completed') completed?: string) {
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      return this.readModel.getReadModelsByCompleted(isCompleted);
    }
    return this.readModel.getAllReadModels();
  }

  @Get('count')
  async count() {
    return { count: this.readModel.getCount() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = this.readModel.getReadModel(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    return this.eventSourcingService.getTaskHistory(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    const result = await this.eventSourcingService.updateTask(id, dto);
    
    // Update read model
    const allEvents = await (this.eventSourcingService as any).eventStore.getEvents(id);
    for (const event of allEvents) {
      this.readModel.projectEvent(event);
    }
    
    return result;
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    const result = await this.eventSourcingService.completeTask(id);
    
    // Update read model
    const allEvents = await (this.eventSourcingService as any).eventStore.getEvents(id);
    for (const event of allEvents) {
      this.readModel.projectEvent(event);
    }
    
    return result;
  }

  @Patch(':id/uncomplete')
  async uncomplete(@Param('id') id: string) {
    const result = await this.eventSourcingService.uncompleteTask(id);
    
    // Update read model
    const allEvents = await (this.eventSourcingService as any).eventStore.getEvents(id);
    for (const event of allEvents) {
      this.readModel.projectEvent(event);
    }
    
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.eventSourcingService.deleteTask(id);
    
    // Update read model
    const allEvents = await (this.eventSourcingService as any).eventStore.getEvents(id);
    for (const event of allEvents) {
      this.readModel.projectEvent(event);
    }
  }
}
