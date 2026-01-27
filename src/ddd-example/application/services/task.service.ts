import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { TaskId } from '../../domain/value-objects/task-id.vo';
import { TASK_REPOSITORY } from '../ports/task.repository';
import type { TaskRepository } from '../ports/task.repository';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '../dto/task.dto';

/**
 * Application Service / Use Cases
 * This orchestrates domain logic and coordinates with repositories
 * This is the application layer - no infrastructure dependencies
 */
@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  /**
   * Create a new task
   */
  async createTask(dto: CreateTaskDto): Promise<TaskDto> {
    // Generate a new ID
    const taskId = TaskId.generate();

    // Create domain entity
    const task = Task.create(
      taskId.toString(),
      dto.title,
      dto.description,
      false,
    );

    // Persist using the repository port
    const savedTask = await this.taskRepository.save(task);

    // Return DTO
    return this.toDto(savedTask);
  }

  /**
   * Get a task by ID
   */
  async getTask(id: string): Promise<TaskDto | null> {
    const task = await this.taskRepository.findById(id);
    return task ? this.toDto(task) : null;
  }

  /**
   * Get all tasks
   */
  async getAllTasks(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.findAll();
    return tasks.map((task) => this.toDto(task));
  }

  /**
   * Get tasks by completion status
   */
  async getTasksByStatus(completed: boolean): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.findByCompleted(completed);
    return tasks.map((task) => this.toDto(task));
  }

  /**
   * Update a task
   */
  async updateTask(id: string, dto: UpdateTaskDto): Promise<TaskDto | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }

    // Use domain methods to update
    if (dto.title !== undefined) {
      task.updateTitle(dto.title);
    }
    if (dto.description !== undefined) {
      task.updateDescription(dto.description);
    }

    // Persist changes
    const updatedTask = await this.taskRepository.save(task);
    return this.toDto(updatedTask);
  }

  /**
   * Complete a task
   */
  async completeTask(id: string): Promise<TaskDto | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }

    // Use domain method
    task.complete();

    // Persist changes
    const updatedTask = await this.taskRepository.save(task);
    return this.toDto(updatedTask);
  }

  /**
   * Uncomplete a task
   */
  async uncompleteTask(id: string): Promise<TaskDto | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }

    // Use domain method
    task.uncomplete();

    // Persist changes
    const updatedTask = await this.taskRepository.save(task);
    return this.toDto(updatedTask);
  }

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }

  /**
   * Get task count
   */
  async getTaskCount(): Promise<number> {
    return this.taskRepository.count();
  }

  /**
   * Map domain entity to DTO
   */
  private toDto(task: Task): TaskDto {
    const data = task.toObject();
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
