import { Injectable, Inject } from '@nestjs/common';
import { DomainEvent } from '../../domain/events/task.events';
import { EVENT_STORE } from '../ports/event.store';
import type { EventStore } from '../ports/event.store';

/**
 * Read Model (Projection)
 *
 * In event sourcing, you typically build separate read models
 * optimized for queries. This is a simple in-memory projection
 * that subscribes to events and updates denormalized data.
 *
 * Benefits:
 * - Optimized for read queries
 * - Can be rebuilt from events
 * - Decoupled from write model
 */
export interface TaskReadModel {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  isDeleted: boolean;
  version: number;
  // Projection-specific fields
  eventCount: number;
}

@Injectable()
export class TaskReadModelProjection {
  private readModels: Map<string, TaskReadModel> = new Map();

  constructor(
    @Inject(EVENT_STORE)
    private readonly eventStore: EventStore,
  ) {}

  /**
   * Rebuild the entire read model from events
   * This is useful for:
   * - Recovering from corruption
   * - Deploying new projections
   * - Testing
   */
  async rebuild(): Promise<void> {
    this.readModels.clear();

    const allEvents = await this.eventStore.getAllEvents();

    for (const event of allEvents) {
      const model = this.readModels.get(event.aggregateId);
      this.applyEventToReadModel(event, model);
    }
  }

  /**
   * Get read model for a task
   */
  getReadModel(id: string): TaskReadModel | null {
    return this.readModels.get(id) || null;
  }

  /**
   * Get all read models
   */
  getAllReadModels(): TaskReadModel[] {
    return Array.from(this.readModels.values()).filter((m) => !m.isDeleted);
  }

  /**
   * Get read models filtered by completion status
   */
  getReadModelsByCompleted(completed: boolean): TaskReadModel[] {
    return this.getAllReadModels().filter((m) => m.completed === completed);
  }

  /**
   * Get read model count
   */
  getCount(): number {
    return this.getAllReadModels().length;
  }

  /**
   * Handle new events and update read model
   */
  projectEvent(event: DomainEvent): void {
    const model = this.readModels.get(event.aggregateId);
    this.applyEventToReadModel(event, model);
  }

  /**
   * Apply an event to the read model
   */
  private applyEventToReadModel(event: DomainEvent, model?: TaskReadModel): void {
    const eventType = event.getEventType();

    switch (eventType) {
      case 'TaskCreated': {
        const e = event as any;
        this.readModels.set(event.aggregateId, {
          id: event.aggregateId,
          title: e.title,
          description: e.description,
          completed: false,
          createdAt: event.timestamp,
          isDeleted: false,
          version: event.version,
          eventCount: 1,
        });
        break;
      }

      case 'TaskTitleUpdated': {
        const e = event as any;
        if (model) {
          model.title = e.title;
          model.version = event.version;
          model.eventCount++;
        }
        break;
      }

      case 'TaskDescriptionUpdated': {
        const e = event as any;
        if (model) {
          model.description = e.description;
          model.version = event.version;
          model.eventCount++;
        }
        break;
      }

      case 'TaskCompleted': {
        if (model) {
          model.completed = true;
          model.version = event.version;
          model.eventCount++;
        }
        break;
      }

      case 'TaskUncompleted': {
        if (model) {
          model.completed = false;
          model.version = event.version;
          model.eventCount++;
        }
        break;
      }

      case 'TaskDeleted': {
        if (model) {
          model.isDeleted = true;
          model.version = event.version;
          model.eventCount++;
        }
        break;
      }
    }
  }
}
