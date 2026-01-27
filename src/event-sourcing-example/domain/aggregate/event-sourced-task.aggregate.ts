import {
  TaskCreatedEvent,
  TaskTitleUpdatedEvent,
  TaskDescriptionUpdatedEvent,
  TaskCompletedEvent,
  TaskUncompletedEvent,
  TaskDeletedEvent,
  DomainEvent,
} from '../events/task.events';

/**
 * Event Sourced Task Aggregate
 *
 * Unlike the DDD Task entity, this version:
 * 1. Records events as they happen (event sourcing)
 * 2. Can be rehydrated from a stream of events
 * 3. Maintains version for optimistic locking
 * 4. Is immutable in terms of state mutations
 */
export class EventSourcedTask {
  private uncommittedEvents: DomainEvent[] = [];
  private version: number = 0;

  // Current state (rehydrated from events)
  private _id: string;
  private _title: string;
  private _description: string;
  private _completed: boolean;
  private _createdAt: Date;
  private _deletedAt: Date | null = null;
  private _isDeleted: boolean = false;

  // Constructor for new aggregate
  constructor(id: string) {
    this._id = id;
    this._title = '';
    this._description = '';
    this._completed = false;
    this._createdAt = new Date();
  }

  // Factory method to create new task
  static create(id: string, title: string, description: string): EventSourcedTask {
    const task = new EventSourcedTask(id);
    const event = new TaskCreatedEvent(id, 1, title, description);
    task.applyEvent(event);
    task.uncommittedEvents.push(event);
    return task;
  }

  // Factory method to rehydrate from events
  static fromEvents(events: DomainEvent[]): EventSourcedTask {
    const task = new EventSourcedTask(events[0]?.aggregateId || '');
    for (const event of events) {
      task.applyEvent(event);
    }
    task.uncommittedEvents = []; // Clear uncommitted events for rehydrated aggregate
    return task;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get completed(): boolean {
    return this._completed;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  get currentVersion(): number {
    return this.version;
  }

  getUncommittedEvents(): DomainEvent[] {
    return this.uncommittedEvents;
  }

  clearUncommittedEvents(): void {
    this.uncommittedEvents = [];
  }

  // Command methods - produce events

  updateTitle(title: string): void {
    if (this._isDeleted) throw new Error('Cannot update deleted task');
    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    const event = new TaskTitleUpdatedEvent(this._id, this.version + 1, title);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  updateDescription(description: string): void {
    if (this._isDeleted) throw new Error('Cannot update deleted task');
    const event = new TaskDescriptionUpdatedEvent(
      this._id,
      this.version + 1,
      description,
    );
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  complete(): void {
    if (this._isDeleted) throw new Error('Cannot update deleted task');
    if (this._completed) throw new Error('Task is already completed');
    const event = new TaskCompletedEvent(this._id, this.version + 1);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  uncomplete(): void {
    if (this._isDeleted) throw new Error('Cannot update deleted task');
    if (!this._completed) throw new Error('Task is not completed');
    const event = new TaskUncompletedEvent(this._id, this.version + 1);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  delete(): void {
    if (this._isDeleted) throw new Error('Task is already deleted');
    const event = new TaskDeletedEvent(this._id, this.version + 1);
    this.applyEvent(event);
    this.uncommittedEvents.push(event);
  }

  // Event application - updates internal state
  private applyEvent(event: DomainEvent): void {
    if (event instanceof TaskCreatedEvent) {
      this._title = event.title;
      this._description = event.description;
      this._completed = false;
      this._createdAt = event.timestamp;
    } else if (event instanceof TaskTitleUpdatedEvent) {
      this._title = event.title;
    } else if (event instanceof TaskDescriptionUpdatedEvent) {
      this._description = event.description;
    } else if (event instanceof TaskCompletedEvent) {
      this._completed = true;
    } else if (event instanceof TaskUncompletedEvent) {
      this._completed = false;
    } else if (event instanceof TaskDeletedEvent) {
      this._isDeleted = true;
      this._deletedAt = event.timestamp;
    }
    this.version = event.version;
  }

  // Convert to plain object for API responses
  toObject() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      completed: this._completed,
      createdAt: this._createdAt,
      isDeleted: this._isDeleted,
      version: this.version,
    };
  }
}
