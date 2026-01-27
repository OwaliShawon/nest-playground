import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../../domain/events/task.events';
import { EventStore } from '../../application/ports/event.store';

/**
 * In-Memory Event Store
 * Simple implementation that stores events in memory
 */
@Injectable()
export class InMemoryEventStore implements EventStore {
  private eventStreams: Map<string, DomainEvent[]> = new Map();
  private allEvents: DomainEvent[] = [];

  async append(aggregateId: string, events: DomainEvent[]): Promise<void> {
    const stream = this.eventStreams.get(aggregateId) || [];
    stream.push(...events);
    this.eventStreams.set(aggregateId, stream);
    this.allEvents.push(...events);
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    return this.eventStreams.get(aggregateId) || [];
  }

  async getAllEvents(): Promise<DomainEvent[]> {
    return this.allEvents;
  }

  async exists(aggregateId: string): Promise<boolean> {
    return this.eventStreams.has(aggregateId);
  }

  // Helper for testing
  clear(): void {
    this.eventStreams.clear();
    this.allEvents = [];
  }
}
