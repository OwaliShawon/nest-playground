/**
 * Domain Events
 * These are immutable facts about what happened in the system
 */

export abstract class DomainEvent {
  readonly aggregateId: string;
  readonly timestamp: Date;
  readonly version: number;

  constructor(aggregateId: string, version: number, timestamp?: Date) {
    this.aggregateId = aggregateId;
    this.version = version;
    this.timestamp = timestamp || new Date();
  }

  abstract getEventType(): string;
}

export class TaskCreatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    readonly title: string,
    readonly description: string,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskCreated';
  }
}

export class TaskTitleUpdatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    readonly title: string,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskTitleUpdated';
  }
}

export class TaskDescriptionUpdatedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    readonly description: string,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskDescriptionUpdated';
  }
}

export class TaskCompletedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskCompleted';
  }
}

export class TaskUncompletedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskUncompleted';
  }
}

export class TaskDeletedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    version: number,
    timestamp?: Date,
  ) {
    super(aggregateId, version, timestamp);
  }

  getEventType(): string {
    return 'TaskDeleted';
  }
}
