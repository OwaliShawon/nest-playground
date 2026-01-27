# DDD Hexagonal Architecture - Implementation Complete! 🎉

## What Was Implemented

A complete **Domain-Driven Design (DDD)** example with **Hexagonal Architecture (Ports and Adapters)** pattern that supports **dynamic switching** between in-memory and ORM persistence.

## File Structure

```
src/ddd-example/
├── 📁 domain/                          # CORE - Pure business logic
│   ├── entities/
│   │   └── task.entity.ts             # Task entity with business rules
│   └── value-objects/
│       └── task-id.vo.ts              # TaskId value object
│
├── 📁 application/                     # USE CASES - Application logic
│   ├── ports/
│   │   └── task.repository.ts         # Repository interface (PORT)
│   ├── dto/
│   │   └── task.dto.ts                # Data transfer objects
│   └── services/
│       └── task.service.ts            # Application services
│
├── 📁 infrastructure/                  # ADAPTERS - Technical implementations
│   └── persistence/
│       ├── in-memory/
│       │   └── in-memory-task.repository.ts    # In-memory adapter
│       └── typeorm/
│           ├── entities/
│           │   └── task.entity.ts              # ORM entity
│           └── typeorm-task.repository.ts      # TypeORM adapter
│
├── 📁 presentation/                    # CONTROLLERS - API layer
│   └── task.controller.ts             # REST controller
│
├── ddd-example.module.ts              # NestJS module with dynamic switching
├── README.md                          # Full documentation
├── ARCHITECTURE.ts                    # Architecture explanation
├── QUICKSTART.sh                      # Quick start guide
└── ddd-tasks.http                     # REST client test file
```

## Key Features

### ✅ Domain-Driven Design
- **Pure domain entities** with no framework dependencies
- **Business logic** encapsulated in domain methods
- **Value objects** for type safety

### ✅ Hexagonal Architecture
- **Ports** (interfaces) define contracts
- **Adapters** implement the contracts
- **Dependency inversion** - infrastructure depends on domain

### ✅ Dynamic Persistence Switching
- **In-Memory Repository** - Fast, volatile, great for testing
- **TypeORM Repository** - Database persistence, production-ready
- Switch at runtime using `PERSISTENCE_TYPE` environment variable

## Quick Start

### 1. Test with In-Memory Persistence

```bash
# Start server with in-memory persistence
PERSISTENCE_TYPE=memory npm run start:dev

# Create a task
curl -X POST http://localhost:3000/ddd/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing in-memory storage"}'

# Get all tasks
curl http://localhost:3000/ddd/tasks

# RESTART the server
# Tasks will be GONE (in-memory is volatile)
```

### 2. Test with ORM Persistence

```bash
# Start server with ORM persistence
PERSISTENCE_TYPE=orm npm run start:dev
# OR simply:
npm run start:dev

# Create a task
curl -X POST http://localhost:3000/ddd/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing database storage"}'

# RESTART the server
# Tasks will PERSIST (stored in database)
```

### 3. Use REST Client

Open `src/ddd-example/ddd-tasks.http` in VS Code and use the REST Client extension to test all endpoints.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ddd/tasks` | Create a new task |
| GET | `/ddd/tasks` | Get all tasks |
| GET | `/ddd/tasks?completed=true` | Get completed tasks |
| GET | `/ddd/tasks/count` | Get task count |
| GET | `/ddd/tasks/:id` | Get task by ID |
| PUT | `/ddd/tasks/:id` | Update a task |
| PATCH | `/ddd/tasks/:id/complete` | Mark task as complete |
| PATCH | `/ddd/tasks/:id/uncomplete` | Mark task as incomplete |
| DELETE | `/ddd/tasks/:id` | Delete a task |

## Architecture Highlights

### Dependency Flow

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│         (Controllers)                   │  ← Driving Adapters
└──────────────┬──────────────────────────┘
               ↓
┌──────────────▼──────────────────────────┐
│        Application Layer                │
│     (Use Cases / Services)              │  ← Application Logic
└──────────────┬──────────────────────────┘
               ↓
┌──────────────▼──────────────────────────┐
│          Domain Layer                   │
│   (Entities, Value Objects)             │  ← Pure Business Logic
└──────────────┬──────────────────────────┘
               ↓ (Port/Interface)
┌──────────────▼──────────────────────────┐
│      Infrastructure Layer               │
│  (Repository Implementations)           │  ← Driven Adapters
└─────────────────────────────────────────┘
```

### Key Concepts

1. **Domain Layer** - No dependencies, pure business logic
2. **Ports** - Interfaces that define contracts
3. **Adapters** - Implementations of ports (in-memory, ORM, etc.)
4. **Dependency Inversion** - All dependencies point inward

## Benefits

✅ **Testability** - Test business logic without infrastructure
✅ **Flexibility** - Swap implementations without code changes
✅ **Maintainability** - Clear separation of concerns
✅ **Independence** - Domain is framework-agnostic
✅ **Scalability** - Easy to add new adapters

## Adding a New Adapter

Want to add MongoDB, Redis, or another persistence layer?

1. Create new adapter: `infrastructure/persistence/mongodb/mongodb-task.repository.ts`
2. Implement `TaskRepository` interface
3. Register in `ddd-example.module.ts`
4. Add to factory switch statement

**No changes needed** in domain, application, or presentation layers!

## Learn More

- 📖 [Full Documentation](README.md)
- 🏗️ [Architecture Details](ARCHITECTURE.ts)
- 🚀 [Quick Start Script](QUICKSTART.sh)
- 🧪 [REST Tests](ddd-tasks.http)

## Example Usage

```bash
# Read the quickstart guide
./src/ddd-example/QUICKSTART.sh

# Or just start testing!
PERSISTENCE_TYPE=memory npm run start:dev
```

---

**Happy coding! 🚀**
