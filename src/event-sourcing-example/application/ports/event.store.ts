import { DomainEvent } from '../../domain/events/task.events';

/**
 * Event Store Port
 * Defines the contract for persisting and retrieving events
 */
export interface EventStore {
  /**
   * Append events to the store
   */
  append(aggregateId: string, events: DomainEvent[]): Promise<void>;

  /**
   * Get all events for an aggregate
   */
  getEvents(aggregateId: string): Promise<DomainEvent[]>;

  /**
   * Get all events (for rebuilding entire state)
   */
  getAllEvents(): Promise<DomainEvent[]>;

  /**
   * Check if aggregate exists
   */
  exists(aggregateId: string): Promise<boolean>;
}

export const EVENT_STORE = Symbol('EVENT_STORE');
