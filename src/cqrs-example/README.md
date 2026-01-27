# CQRS Example

**CQRS** stands for **Command Query Responsibility Segregation**. This pattern separates read and write operations into distinct models.

## Architecture Overview

This CQRS example **reuses the DDD Task domain** from the hexagonal architecture module and adds command and query handlers to orchestrate the domain logic.

```
┌─────────────────────────────┐
│         REST Controller     │  ← Presentation layer
│      (CQRS Endpoints)       │
└──────────────┬──────────────┘
               │
       ┌───────┴───────┐
       │               │
   ┌───▼────┐    ┌────▼───┐
   │CommandBus    QueryBus │
   └───┬────┘    └────┬───┘
       │              │
   ┌───▼──────────────▼───┐
   │   Handlers           │
   │ (Orchestrate Domain) │
   └───┬──────────────┬───┘
       │              │
   ┌───▼──────────────▼─────────────┐
   │  DDD Domain Layer               │
   │  (Task Entity, Value Objects)   │
   └────────┬──────────────┬─────────┘
            │              │
        ┌───▼──────────────▼───┐
        │  Repository Port     │
        │    (Driven Port)     │
        └────────┬─────────────┘
                 │
        ┌────────▼──────────┐
        │  Persistence      │
        │  (In-Memory/ORM)  │
        └───────────────────┘
```

## Key Concepts

### Commands
Commands represent **write/state-changing operations**:
- `CreateTaskCommand` - Create a new task
- `UpdateTaskCommand` - Update task properties
- `CompleteTaskCommand` - Mark task as complete
- `UncompleteTaskCommand` - Mark task as incomplete
- `DeleteTaskCommand` - Delete a task

### Queries
Queries represent **read-only operations**:
- `GetTaskQuery` - Fetch a single task by ID
- `GetTasksQuery` - Fetch all tasks, optionally filtered by completion status
- `GetTaskCountQuery` - Count total tasks

### Handlers
Handlers execute the commands and queries:
- **CommandHandlers** execute domain logic and modify state
- **QueryHandlers** fetch and return data without side effects

### Buses
- **CommandBus** routes commands to their handlers
- **QueryBus** routes queries to their handlers

## Separation of Concerns

**Benefits of CQRS over traditional CRUD:**

| Aspect | Traditional CRUD | CQRS |
|--------|-----------------|------|
| **Read Model** | Same as write model | Optimized separately |
| **Scaling** | Same resources for reads/writes | Scale independently |
| **Complexity** | Simple for small apps | Better for large systems |
| **Testing** | Mix of concerns | Clear command/query intent |
| **Caching** | Harder to implement | Natural fit |

## API Endpoints

All endpoints under `/cqrs/tasks`:

| Method | Endpoint | Command/Query | Description |
|--------|----------|---------------|-------------|
| POST | `/` | `CreateTaskCommand` | Create a new task |
| GET | `/` | `GetTasksQuery` | Get all tasks |
| GET | `/?completed=true` | `GetTasksQuery` | Get completed tasks |
| GET | `/?completed=false` | `GetTasksQuery` | Get incomplete tasks |
| GET | `/count` | `GetTaskCountQuery` | Get task count |
| GET | `/:id` | `GetTaskQuery` | Get task by ID |
| PUT | `/:id` | `UpdateTaskCommand` | Update task |
| PATCH | `/:id/complete` | `CompleteTaskCommand` | Mark task complete |
| PATCH | `/:id/uncomplete` | `UncompleteTaskCommand` | Mark task incomplete |
| DELETE | `/:id` | `DeleteTaskCommand` | Delete task |

## Request/Response Examples

### Create Task
```bash
curl -X POST http://localhost:3000/cqrs/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn CQRS",
    "description": "Understand command query separation"
  }'
```

Response:
```json
{
  "id": "task_xyz123",
  "title": "Learn CQRS",
  "description": "Understand command query separation",
  "completed": false,
  "createdAt": "2026-01-27T12:00:00.000Z",
  "updatedAt": "2026-01-27T12:00:00.000Z"
}
```

### Get All Tasks
```bash
curl http://localhost:3000/cqrs/tasks
```

### Complete a Task
```bash
curl -X PATCH http://localhost:3000/cqrs/tasks/task_xyz123/complete
```

## How It Works

### Command Flow Example: Complete Task

```
1. HTTP Request arrives
   PATCH /cqrs/tasks/task-123/complete

2. Controller receives request
   controller.complete('task-123')

3. Controller sends command to CommandBus
   commandBus.execute(new CompleteTaskCommand('task-123'))

4. CommandBus routes to CompleteTaskHandler
   handler.execute(command)

5. Handler orchestrates domain logic
   - Load task from repository
   - Call domain method: task.complete()
   - Save updated task back

6. Repository adapter persists (in-memory or ORM)
   IF memory: stores in Map
   IF orm: saves to database

7. Updated task returned as response
```

## Integration with DDD

The CQRS handlers **reuse the DDD domain**:

1. **Domain Entity** (`Task`) - Contains business rules
2. **Domain Value Object** (`TaskId`) - Type-safe identifiers
3. **Repository Port** - Same interface from DDD hexagonal pattern
4. **Dynamic Persistence** - Same in-memory/ORM switching as DDD example

### Example Handler

```typescript
@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly repo: TaskRepository,
  ) {}

  async execute(command: CompleteTaskCommand) {
    // Load domain entity
    const task = await this.repo.findById(command.id);
    
    // Call domain method (enforces business rules)
    task.complete();
    
    // Persist changes
    const updated = await this.repo.save(task);
    
    return updated.toObject();
  }
}
```

## Testing CQRS

### With In-Memory Persistence
```bash
PERSISTENCE_TYPE=memory npm run start:dev
# Create tasks, test commands/queries
# Restart server - tasks are gone
```

### With ORM Persistence
```bash
PERSISTENCE_TYPE=orm npm run start:dev
# Create tasks, test commands/queries
# Restart server - tasks persist
```

## File Structure

```
src/cqrs-example/
├── application/
│   ├── commands/           # Command definitions
│   │   ├── create-task.command.ts
│   │   ├── update-task.command.ts
│   │   ├── complete-task.command.ts
│   │   ├── uncomplete-task.command.ts
│   │   └── delete-task.command.ts
│   ├── queries/            # Query definitions
│   │   ├── get-task.query.ts
│   │   ├── get-tasks.query.ts
│   │   └── get-task-count.query.ts
│   └── handlers/           # Command & Query handlers
│       ├── create-task.handler.ts
│       ├── update-task.handler.ts
│       ├── complete-task.handler.ts
│       ├── uncomplete-task.handler.ts
│       ├── delete-task.handler.ts
│       ├── get-task.handler.ts
│       ├── get-tasks.handler.ts
│       └── get-task-count.handler.ts
├── presentation/
│   └── cqrs-task.controller.ts     # REST endpoints
└── cqrs-example.module.ts          # NestJS module
```

## Learn More

- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)
- [NestJS CQRS Documentation](https://docs.nestjs.com/recipes/cqrs)
- [DDD Hexagonal Example](../ddd-example/README.md) - Domain & persistence layer reused here
