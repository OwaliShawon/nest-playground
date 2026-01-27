import { Injectable } from '@nestjs/common';
import { Task } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../application/ports/task.repository';

/**
 * In-Memory Adapter for TaskRepository
 * This is a DRIVEN adapter (implements the repository port)
 * No external dependencies, just stores data in memory
 */
@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Map<string, Task> = new Map();

  async save(task: Task): Promise<Task> {
    const taskData = task.toObject();
    
    // Reconstitute to ensure we store a fresh instance
    const persistedTask = Task.reconstitute(
      taskData.id,
      taskData.title,
      taskData.description,
      taskData.completed,
      taskData.createdAt,
      taskData.updatedAt,
    );

    this.tasks.set(taskData.id, persistedTask);
    return persistedTask;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.get(id);
    return task || null;
  }

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async findByCompleted(completed: boolean): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.completed === completed,
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async count(): Promise<number> {
    return this.tasks.size;
  }

  // Helper method for testing
  clear(): void {
    this.tasks.clear();
  }
}
