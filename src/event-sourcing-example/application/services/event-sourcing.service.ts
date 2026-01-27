import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventSourcedTask } from '../../domain/aggregate/event-sourced-task.aggregate';
import { EVENT_STORE } from '../ports/event.store';
import type { EventStore } from '../ports/event.store';

export class CreateTaskDto {
  title: string;
  description: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
}

/**
 * Event Sourcing Service
 *
 * This service demonstrates event sourcing pattern:
 * 1. Commands mutate the aggregate and produce events
 * 2. Events are persisted to the event store
 * 3. State is rehydrated by replaying events
 * 4. No direct state storage - only events
 */
@Injectable()
export class EventSourcingService {
  constructor(
    @Inject(EVENT_STORE)
    private readonly eventStore: EventStore,
  ) {}

  /**
   * Create a new task
   * 1. Create aggregate
   * 2. Persist events
   * 3. Return current state
   */
  async createTask(id: string, dto: CreateTaskDto) {
    const task = EventSourcedTask.create(id, dto.title, dto.description);
    const events = task.getUncommittedEvents();
    await this.eventStore.append(id, events);
    return task.toObject();
  }

  /**
   * Load task and apply command
   * 1. Rehydrate aggregate from events
   * 2. Apply command (produces new events)
   * 3. Persist new events
   * 4. Return updated state
   */
  async updateTask(id: string, dto: UpdateTaskDto) {
    const task = await this.loadTask(id);

    if (dto.title !== undefined) task.updateTitle(dto.title);
    if (dto.description !== undefined) task.updateDescription(dto.description);

    const events = task.getUncommittedEvents();
    if (events.length > 0) {
      await this.eventStore.append(id, events);
    }

    return task.toObject();
  }

  async completeTask(id: string) {
    const task = await this.loadTask(id);
    task.complete();
    const events = task.getUncommittedEvents();
    await this.eventStore.append(id, events);
    return task.toObject();
  }

  async uncompleteTask(id: string) {
    const task = await this.loadTask(id);
    task.uncomplete();
    const events = task.getUncommittedEvents();
    await this.eventStore.append(id, events);
    return task.toObject();
  }

  async deleteTask(id: string) {
    const task = await this.loadTask(id);
    task.delete();
    const events = task.getUncommittedEvents();
    await this.eventStore.append(id, events);
    return { deleted: true };
  }

  /**
   * Rehydrate task by replaying all events
   * This is the core of event sourcing: state = reduce(events)
   */
  async getTask(id: string) {
    const task = await this.loadTask(id);
    return task.toObject();
  }

  /**
   * Get all tasks by replaying all events and filtering
   */
  async getAllTasks() {
    const allEvents = await this.eventStore.getAllEvents();
    const taskMap = new Map<string, EventSourcedTask>();

    for (const event of allEvents) {
      if (!taskMap.has(event.aggregateId)) {
        taskMap.set(event.aggregateId, new EventSourcedTask(event.aggregateId));
      }

      const task = taskMap.get(event.aggregateId)!;
      // Rehydrate by applying event
      (task as any).applyEvent(event);
    }

    return Array.from(taskMap.values())
      .filter((t) => !(t as any)._isDeleted)
      .map((t) => t.toObject());
  }

  /**
   * Get tasks filtered by completion status
   */
  async getTasksByCompleted(completed: boolean) {
    const allTasks = await this.getAllTasks();
    return allTasks.filter((t) => t.completed === completed);
  }

  /**
   * Get event history for a task (audit trail)
   */
  async getTaskHistory(id: string) {
    const exists = await this.eventStore.exists(id);
    if (!exists) throw new NotFoundException('Task not found');

    const events = await this.eventStore.getEvents(id);
    return events.map((e) => ({
      type: e.getEventType(),
      version: e.version,
      timestamp: e.timestamp,
      data: {
        ...(e as any),
      },
    }));
  }

  /**
   * Load and rehydrate task from event stream
   */
  private async loadTask(id: string): Promise<EventSourcedTask> {
    const exists = await this.eventStore.exists(id);
    if (!exists) throw new NotFoundException('Task not found');

    const events = await this.eventStore.getEvents(id);
    return EventSourcedTask.fromEvents(events);
  }
}
