import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './presentation/task.controller';
import { TaskService } from './application/services/task.service';
import { TASK_REPOSITORY } from './application/ports/task.repository';
import { InMemoryTaskRepository } from './infrastructure/persistence/in-memory/in-memory-task.repository';
import { TypeOrmTaskRepository } from './infrastructure/persistence/typeorm/typeorm-task.repository';
import { TaskEntity } from './infrastructure/persistence/typeorm/entities/task.entity';

/**
 * DDD Example Module with Dynamic Persistence Selection
 * 
 * This module demonstrates the hexagonal architecture pattern.
 * You can switch between in-memory and ORM persistence by changing
 * the PERSISTENCE_TYPE environment variable.
 * 
 * Usage:
 * - PERSISTENCE_TYPE=memory - Uses in-memory repository
 * - PERSISTENCE_TYPE=orm - Uses TypeORM repository (default)
 */
@Module({
  imports: [
    // Only import TypeORM entities if using ORM persistence
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    InMemoryTaskRepository,
    TypeOrmTaskRepository,
    {
      provide: TASK_REPOSITORY,
      useFactory: (
        inMemoryRepo: InMemoryTaskRepository,
        typeOrmRepo: TypeOrmTaskRepository,
      ) => {
        // Dynamic selection based on environment variable
        const persistenceType = process.env.PERSISTENCE_TYPE || 'orm';
        
        console.log(`[DDD Example] Using ${persistenceType.toUpperCase()} persistence`);
        
        if (persistenceType === 'memory') {
          return inMemoryRepo;
        }
        
        return typeOrmRepo;
      },
      inject: [InMemoryTaskRepository, TypeOrmTaskRepository],
    },
  ],
  exports: [TaskService],
})
export class DddExampleModule {}
