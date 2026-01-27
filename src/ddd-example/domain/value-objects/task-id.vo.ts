/**
 * Value Object - TaskId
 * Encapsulates task identifier logic
 */
export class TaskId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('TaskId cannot be empty');
    }
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: TaskId): boolean {
    return this.value === other.value;
  }

  static generate(): TaskId {
    // Simple UUID-like generation
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return new TaskId(`task_${timestamp}_${random}`);
  }
}
