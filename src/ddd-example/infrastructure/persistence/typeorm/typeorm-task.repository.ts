import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../application/ports/task.repository';
import { TaskEntity } from './entities/task.entity';

/**
 * TypeORM Adapter for TaskRepository
 * This is a DRIVEN adapter (implements the repository port)
 * Uses TypeORM for database persistence
 */
@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskEntityRepository: Repository<TaskEntity>,
  ) {}

  async save(task: Task): Promise<Task> {
    const taskData = task.toObject();
    
    // Map domain entity to ORM entity
    const taskEntity = this.taskEntityRepository.create({
      id: taskData.id,
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
      createdAt: taskData.createdAt,
      updatedAt: taskData.updatedAt,
    });

    const saved = await this.taskEntityRepository.save(taskEntity);
    
    // Map ORM entity back to domain entity
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Task | null> {
    const taskEntity = await this.taskEntityRepository.findOne({
      where: { id },
    });

    return taskEntity ? this.toDomain(taskEntity) : null;
  }

  async findAll(): Promise<Task[]> {
    const taskEntities = await this.taskEntityRepository.find();
    return taskEntities.map((entity) => this.toDomain(entity));
  }

  async findByCompleted(completed: boolean): Promise<Task[]> {
    const taskEntities = await this.taskEntityRepository.find({
      where: { completed },
    });
    return taskEntities.map((entity) => this.toDomain(entity));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskEntityRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(): Promise<number> {
    return this.taskEntityRepository.count();
  }

  /**
   * Maps TypeORM entity to domain entity
   */
  private toDomain(entity: TaskEntity): Task {
    return Task.reconstitute(
      entity.id,
      entity.title,
      entity.description,
      entity.completed,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
