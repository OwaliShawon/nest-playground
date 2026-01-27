# DDD Hexagonal Architecture Example

This directory contains a complete implementation of Domain-Driven Design (DDD) with Hexagonal Architecture (Ports and Adapters pattern).

## Architecture Overview

```
ddd-example/
├── domain/                      # Core business logic (innermost layer)
│   ├── entities/               # Domain entities with business rules
│   │   └── task.entity.ts     # Task entity with business methods
│   └── value-objects/         # Value objects (immutable)
│       └── task-id.vo.ts      # Task ID value object
│
├── application/                # Application layer (use cases)
│   ├── ports/                 # Interfaces (contracts)
│   │   └── task.repository.ts # Repository port (interface)
│   ├── dto/                   # Data Transfer Objects
│   │   └── task.dto.ts        # DTOs for communication
│   └── services/              # Application services (use cases)
│       └── task.service.ts    # Task use cases
│
├── infrastructure/             # Infrastructure layer (outermost layer)
│   └── persistence/           # Persistence implementations
│       ├── in-memory/         # In-memory adapter
│       │   └── in-memory-task.repository.ts
│       └── typeorm/           # TypeORM adapter
│           ├── entities/      # ORM entities (infrastructure concern)
│           │   └── task.entity.ts
│           └── typeorm-task.repository.ts
│
├── presentation/              # Presentation layer (adapters)
│   └── task.controller.ts    # REST controller
│
└── ddd-example.module.ts     # NestJS module with dynamic switching
```

## Key Concepts

### 1. **Domain Layer** (Core Business Logic)
- **No framework dependencies** - Pure TypeScript/JavaScript
- Contains business entities and value objects
- Implements business rules and invariants
- Independent of infrastructure concerns

### 2. **Application Layer** (Use Cases)
- Orchestrates domain logic
- Defines **Ports** (interfaces) that infrastructure must implement
- Contains application services that use domain entities
- Uses DTOs for data transfer

### 3. **Infrastructure Layer** (Technical Details)
- **Adapters** that implement the ports
- Multiple implementations:
  - **In-Memory Repository**: For testing and development
  - **TypeORM Repository**: For database persistence
- Can be swapped without changing business logic

### 4. **Hexagonal Architecture Pattern**

```
          ┌─────────────────────────────┐
          │    Presentation Layer       │
          │   (REST Controllers)        │
          └──────────┬──────────────────┘
                     │ DRIVING Port
          ┌──────────▼──────────────────┐
          │   Application Layer         │
          │   (Use Cases/Services)      │
          └──────────┬──────────────────┘
                     │
          ┌──────────▼──────────────────┐
          │     Domain Layer            │
          │  (Entities, Value Objects)  │
          └──────────┬──────────────────┘
                     │ DRIVEN Port
          ┌──────────▼──────────────────┐
          │  Infrastructure Layer       │
          │  (Repository Adapters)      │
          └─────────────────────────────┘
```

## Dynamic Persistence Switching

The module supports dynamic switching between persistence strategies using environment variables:

```bash
# Use in-memory persistence (great for testing)
PERSISTENCE_TYPE=memory npm run start:dev

# Use ORM persistence (default, for production)
PERSISTENCE_TYPE=orm npm run start:dev
```

This is configured in [ddd-example.module.ts](ddd-example.module.ts) using a factory provider.

## API Endpoints

```bash
# Create a new task
POST /ddd/tasks
{
  "title": "Learn DDD",
  "description": "Study Domain-Driven Design"
}

# Get all tasks
GET /ddd/tasks

# Get completed/incomplete tasks
GET /ddd/tasks?completed=true
GET /ddd/tasks?completed=false

# Get task count
GET /ddd/tasks/count

# Get a specific task
GET /ddd/tasks/:id

# Update a task
PUT /ddd/tasks/:id
{
  "title": "Updated title",
  "description": "Updated description"
}

# Mark task as complete
PATCH /ddd/tasks/:id/complete

# Mark task as incomplete
PATCH /ddd/tasks/:id/uncomplete

# Delete a task
DELETE /ddd/tasks/:id
```

## Testing the Implementation

### 1. Start with In-Memory Persistence

```bash
# Terminal 1 - Start the server with in-memory persistence
PERSISTENCE_TYPE=memory npm run start:dev
```

```bash
# Terminal 2 - Test the API
# Create a task
curl -X POST http://localhost:3000/ddd/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Hexagonal Architecture","description":"Understand ports and adapters"}'

# Get all tasks
curl http://localhost:3000/ddd/tasks

# Complete a task (use ID from previous response)
curl -X PATCH http://localhost:3000/ddd/tasks/task_xyz_123/complete
```

### 2. Switch to ORM Persistence

```bash
# Restart with ORM persistence
PERSISTENCE_TYPE=orm npm run start:dev

# Same API calls work - but now data persists to database!
```

## Benefits of This Architecture

1. **Testability**: Easy to test business logic without database
2. **Flexibility**: Swap persistence strategies without changing business logic
3. **Maintainability**: Clear separation of concerns
4. **Independence**: Domain layer has no framework dependencies
5. **Scalability**: Easy to add new adapters (MongoDB, Redis, etc.)

## Adding a New Adapter

To add a new persistence adapter (e.g., MongoDB):

1. Create `infrastructure/persistence/mongodb/mongodb-task.repository.ts`
2. Implement the `TaskRepository` interface
3. Register in `ddd-example.module.ts`
4. Add to the factory's switch statement

Example:

```typescript
// mongodb-task.repository.ts
@Injectable()
export class MongoDbTaskRepository implements TaskRepository {
  // Implementation
}

// In ddd-example.module.ts
providers: [
  MongoDbTaskRepository, // Add new provider
  {
    provide: TASK_REPOSITORY,
    useFactory: (inMemory, typeOrm, mongoDB) => {
      const type = process.env.PERSISTENCE_TYPE || 'orm';
      if (type === 'memory') return inMemory;
      if (type === 'mongodb') return mongoDB; // Add case
      return typeOrm;
    },
    inject: [InMemoryTaskRepository, TypeOrmTaskRepository, MongoDbTaskRepository],
  }
]
```

## Key Files

- **[task.entity.ts](domain/entities/task.entity.ts)**: Domain entity with business logic
- **[task.repository.ts](application/ports/task.repository.ts)**: Repository port (interface)
- **[task.service.ts](application/services/task.service.ts)**: Application use cases
- **[in-memory-task.repository.ts](infrastructure/persistence/in-memory/in-memory-task.repository.ts)**: In-memory adapter
- **[typeorm-task.repository.ts](infrastructure/persistence/typeorm/typeorm-task.repository.ts)**: TypeORM adapter
- **[task.controller.ts](presentation/task.controller.ts)**: REST controller
- **[ddd-example.module.ts](ddd-example.module.ts)**: Module with dynamic switching

## Learn More

- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)
