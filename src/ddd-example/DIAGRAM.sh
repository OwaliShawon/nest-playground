#!/bin/bash

# Visual demonstration of the hexagonal architecture

cat << 'EOF'

╔═══════════════════════════════════════════════════════════════════════════╗
║                   DDD HEXAGONAL ARCHITECTURE DIAGRAM                      ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                              │
│                       (Driving Adapters)                                │
│                                                                         │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐        │
│   │     REST     │      │   GraphQL    │      │     CLI      │        │
│   │  Controller  │      │   Resolver   │      │   Commands   │        │
│   └──────┬───────┘      └──────┬───────┘      └──────┬───────┘        │
│          │                     │                     │                 │
└──────────┼─────────────────────┼─────────────────────┼─────────────────┘
           │                     │                     │
           └─────────────────────┴─────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION LAYER                                │
│                    (Use Cases / Business Logic)                         │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                        TaskService                              │  │
│   │  ┌──────────────────────────────────────────────────────────┐   │  │
│   │  │ - createTask()                                           │   │  │
│   │  │ - completeTask()                                         │   │  │
│   │  │ - updateTask()                                           │   │  │
│   │  └──────────────────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                 │                                       │
│                                 │ uses                                  │
│                                 ▼                                       │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                  TaskRepository (PORT)                          │  │
│   │                     «interface»                                 │  │
│   │  ┌──────────────────────────────────────────────────────────┐   │  │
│   │  │ + save(task: Task): Promise<Task>                        │   │  │
│   │  │ + findById(id: string): Promise<Task | null>             │   │  │
│   │  │ + findAll(): Promise<Task[]>                             │   │  │
│   │  │ + delete(id: string): Promise<boolean>                   │   │  │
│   │  └──────────────────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 │ depends on
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           DOMAIN LAYER                                  │
│                    (Pure Business Logic)                                │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                         Task Entity                             │  │
│   │  ┌──────────────────────────────────────────────────────────┐   │  │
│   │  │ - id: string                                             │   │  │
│   │  │ - title: string                                          │   │  │
│   │  │ - completed: boolean                                     │   │  │
│   │  │ + complete(): void                                       │   │  │
│   │  │ + updateTitle(title: string): void                       │   │  │
│   │  └──────────────────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                      TaskId Value Object                        │  │
│   │  ┌──────────────────────────────────────────────────────────┐   │  │
│   │  │ + generate(): TaskId                                     │   │  │
│   │  │ + equals(other: TaskId): boolean                         │   │  │
│   │  └──────────────────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │ implements (PORT)
                                 │
┌─────────────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE LAYER                               │
│                       (Driven Adapters)                                 │
│                                                                         │
│   ┌──────────────────────────┐       ┌──────────────────────────┐      │
│   │  InMemoryTaskRepository  │       │  TypeOrmTaskRepository   │      │
│   │  implements TaskRepository       │  implements TaskRepository      │
│   │                          │       │                          │      │
│   │  ┌────────────────────┐  │       │  ┌────────────────────┐  │      │
│   │  │ Map<string, Task> │  │       │  │   PostgreSQL DB    │  │      │
│   │  │                    │  │       │  │   (via TypeORM)    │  │      │
│   │  │ Fast & Volatile    │  │       │  │                    │  │      │
│   │  │ Great for testing  │  │       │  │ Persistent storage │  │      │
│   │  └────────────────────┘  │       │  └────────────────────┘  │      │
│   └──────────────────────────┘       └──────────────────────────┘      │
│              │                                    │                     │
│              └────────────┬───────────────────────┘                     │
│                           │                                             │
│                           ▼                                             │
│              ┌─────────────────────────┐                                │
│              │  DYNAMIC FACTORY        │                                │
│              │  (DI Container)         │                                │
│              │                         │                                │
│              │  if PERSISTENCE_TYPE == │                                │
│              │    'memory' → InMemory  │                                │
│              │    'orm'    → TypeORM   │                                │
│              └─────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────┘


╔═══════════════════════════════════════════════════════════════════════════╗
║                          DEPENDENCY FLOW                                  ║
╚═══════════════════════════════════════════════════════════════════════════╝

  Presentation  ──depends on──>  Application  ──depends on──>  Domain
       │                              │                           ▲
       │                              │                           │
       │                              ▼                           │
       └────────────>  Infrastructure  ──────implements───────────┘

KEY PRINCIPLE: Dependencies point INWARD (toward the domain)


╔═══════════════════════════════════════════════════════════════════════════╗
║                    RUNTIME FLOW: Creating a Task                          ║
╚═══════════════════════════════════════════════════════════════════════════╝

1. HTTP Request
   POST /ddd/tasks
   { "title": "Learn DDD", "description": "..." }
   │
   ▼
2. TaskController.create(dto)
   │
   ▼
3. TaskService.createTask(dto)
   │
   ├─> Generate TaskId (value object)
   │
   ├─> Task.create() (domain factory)
   │   └─> Creates Task entity
   │       └─> Validates business rules
   │
   ├─> taskRepository.save(task)  ← Uses PORT (interface)
   │   │
   │   ▼
   │   [DYNAMIC CHOICE based on PERSISTENCE_TYPE]
   │   │
   │   ├─> If 'memory':
   │   │   InMemoryTaskRepository.save()
   │   │   └─> Store in Map
   │   │
   │   └─> If 'orm':
   │       TypeOrmTaskRepository.save()
   │       ├─> Convert Task → TaskEntity (ORM)
   │       ├─> Save to PostgreSQL
   │       └─> Convert TaskEntity → Task
   │
   └─> Return TaskDto (response)


╔═══════════════════════════════════════════════════════════════════════════╗
║                      SWITCHING PERSISTENCE                                ║
╚═══════════════════════════════════════════════════════════════════════════╝

TERMINAL 1: In-Memory Persistence
┌─────────────────────────────────────────┐
│ $ PERSISTENCE_TYPE=memory \             │
│   npm run start:dev                     │
│                                         │
│ [DDD Example] Using MEMORY persistence  │
│                                         │
│ TaskRepository ──> InMemoryRepository   │
│                    └─> Map storage      │
│                        (volatile)       │
└─────────────────────────────────────────┘

TERMINAL 2: Database Persistence
┌─────────────────────────────────────────┐
│ $ PERSISTENCE_TYPE=orm \                │
│   npm run start:dev                     │
│                                         │
│ [DDD Example] Using ORM persistence     │
│                                         │
│ TaskRepository ──> TypeOrmRepository    │
│                    └─> PostgreSQL DB    │
│                        (persistent)     │
└─────────────────────────────────────────┘


╔═══════════════════════════════════════════════════════════════════════════╗
║                        KEY BENEFITS                                       ║
╚═══════════════════════════════════════════════════════════════════════════╝

✓ Business logic is PURE (no framework dependencies)
✓ Easy to TEST (use in-memory for tests)
✓ Easy to CHANGE (swap adapters without touching business logic)
✓ Clear SEPARATION of concerns
✓ Multiple IMPLEMENTATIONS possible (MongoDB, Redis, etc.)
✓ FRAMEWORK-INDEPENDENT domain

EOF
