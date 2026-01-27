/**
 * Domain Entity - Task
 * Pure business logic, no framework dependencies
 */
export class Task {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _description: string,
    private _completed: boolean,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

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

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business methods
  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    this._title = title;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this._description = description;
    this._updatedAt = new Date();
  }

  complete(): void {
    if (this._completed) {
      throw new Error('Task is already completed');
    }
    this._completed = true;
    this._updatedAt = new Date();
  }

  uncomplete(): void {
    if (!this._completed) {
      throw new Error('Task is already incomplete');
    }
    this._completed = false;
    this._updatedAt = new Date();
  }

  // Factory method
  static create(
    id: string,
    title: string,
    description: string,
    completed: boolean = false,
  ): Task {
    if (!title || title.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }

    const now = new Date();
    return new Task(id, title, description, completed, now, now);
  }

  // Reconstitute from persistence
  static reconstitute(
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): Task {
    return new Task(id, title, description, completed, createdAt, updatedAt);
  }

  // Convert to plain object for persistence
  toObject(): {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      completed: this._completed,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
