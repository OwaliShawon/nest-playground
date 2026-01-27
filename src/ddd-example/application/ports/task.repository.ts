import { Task } from '../../domain/entities/task.entity';

/**
 * Port (Interface) - Repository Pattern
 * This defines the contract that any persistence adapter must implement
 * This is a DRIVEN port (infrastructure implements this)
 */
export interface TaskRepository {
  /**
   * Save a task (create or update)
   */
  save(task: Task): Promise<Task>;

  /**
   * Find a task by ID
   */
  findById(id: string): Promise<Task | null>;

  /**
   * Find all tasks
   */
  findAll(): Promise<Task[]>;

  /**
   * Find tasks by completion status
   */
  findByCompleted(completed: boolean): Promise<Task[]>;

  /**
   * Delete a task by ID
   */
  delete(id: string): Promise<boolean>;

  /**
   * Count all tasks
   */
  count(): Promise<number>;
}

/**
 * Token for dependency injection
 */
export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');
