# Event Sourcing Example - Rehydration & Event Replay

**Event Sourcing** stores state as a sequence of immutable events rather than storing current state directly. State is rehydrated by replaying events.

## Key Concept: State = Fold(Events)

Instead of storing:
```
{ id: "1", title: "Task", completed: true, version: 5 }
```

Event Sourcing stores:
```
TaskCreated      { id: "1", title: "Task", ... }
TaskCompleted    { id: "1", ... }
TaskUncompleted  { id: "1", ... }
TaskCompleted    { id: "1", ... }
```

Current state is computed by applying all events in order:
```
state = initialState
for event in events:
    state = applyEvent(state, event)
```

## Architecture

```
┌─────────────────────────────────────────┐
│   REST Controller (Commands/Queries)    │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴───────────┐
        │                      │
    ┌───▼─────────┐      ┌────▼────────┐
    │  Command    │      │   Query     │
    │  (Mutate)   │      │   (Read)    │
    └───┬─────────┘      └────┬────────┘
        │                     │
    ┌───▼──────────────────┐  │
    │ Event Sourced        │  │
    │ Aggregate            │  │
    │ (Records Events)     │  │
    └───┬──────────────────┘  │
        │                     │
    ┌───▼──────────────────────▼────────┐
    │     Event Store (Append-only)    │
    │  Immutable sequence of events    │
    └────────┬───────────────────────────┘
             │
    ┌────────▼─────────────┐
    │ Read Model           │
    │ (Projection)         │
    │ Optimized for reads  │
    └──────────────────────┘
```

## Core Components

### 1. **Domain Events**
Immutable facts about what happened:
```typescript
class TaskCreatedEvent extends DomainEvent {
  constructor(id: string, title: string, description: string) { ... }
}

class TaskCompletedEvent extends DomainEvent {
  constructor(id: string) { ... }
}
```

### 2. **Event Sourced Aggregate**
Records events and can be rehydrated:
```typescript
const task = EventSourcedTask.create("1", "Task", "Description");
task.complete(); // Records TaskCompletedEvent

// Later, rehydrate from events
const events = [TaskCreatedEvent(...), TaskCompletedEvent(...)];
const task = EventSourcedTask.fromEvents(events);
console.log(task.completed); // true
```

### 3. **Event Store**
Persists immutable event streams:
```typescript
await eventStore.append("task-1", [event1, event2]);
const events = await eventStore.getEvents("task-1");
```

### 4. **Read Model (Projection)**
Denormalized data optimized for queries:
```typescript
// Built from events
const readModel = {
  id: "1",
  title: "Task",
  completed: true,
  eventCount: 3  // how many events it took
};
```

### 5. **Event Sourcing Service**
Orchestrates the pattern:
```typescript
// Command: Apply mutation and persist events
await service.createTask(id, dto);

// Query: Read from denormalized model
const task = readModel.getReadModel(id);
```

## Benefits

✅ **Complete Audit Trail** - Every change is recorded  
✅ **Temporal Queries** - State at any point in time  
✅ **Event Replay** - Rebuild state deterministically  
✅ **Scalability** - Append-only writes (no hotspots)  
✅ **Event-Driven** - Trigger side effects from events  
✅ **Testing** - Replay scenarios deterministically  

## Trade-offs

⚠️ **Consistency** - Read models are eventually consistent  
⚠️ **Storage** - Stores all events (need snapshots for long streams)  
⚠️ **Complexity** - More infrastructure than traditional CRUD  
⚠️ **Querying** - Harder to query across aggregates  

## API Endpoints

All endpoints under `/event-sourcing/tasks`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create task (records `TaskCreatedEvent`) |
| GET | `/` | Get all tasks (from read model) |
| GET | `/count` | Get task count |
| GET | `/:id` | Get task (from read model) |
| GET | `/:id/history` | Get event history/audit trail |
| PUT | `/:id` | Update task (records update events) |
| PATCH | `/:id/complete` | Complete task (records `TaskCompletedEvent`) |
| PATCH | `/:id/uncomplete` | Uncomplete task (records `TaskUncompletedEvent`) |
| DELETE | `/:id` | Delete task (records `TaskDeletedEvent`) |

## Event Rehydration Flow

### Creating a Task
```
1. POST /event-sourcing/tasks
   { "title": "Learn ES", "description": "..." }

2. Service creates aggregate
   EventSourcedTask.create(id, title, description)
   └─ Records TaskCreatedEvent(id, title, description)

3. Event is persisted
   eventStore.append(id, [TaskCreatedEvent])

4. Read model is updated
   readModel.projectEvent(TaskCreatedEvent)

5. Return current state
   { id, title, description, completed: false, version: 1 }
```

### Completing a Task
```
1. PATCH /event-sourcing/tasks/task-123/complete

2. Service loads aggregate (REHYDRATION)
   events = eventStore.getEvents("task-123")
   task = EventSourcedTask.fromEvents(events)
   └─ Replays TaskCreatedEvent → state = { ..., completed: false }

3. Apply command to aggregate
   task.complete()
   └─ Records TaskCompletedEvent

4. Persist new event
   eventStore.append("task-123", [TaskCompletedEvent])

5. Update read model
   readModel.projectEvent(TaskCompletedEvent)
   └─ Updates cached projection

6. Return current state
   { id, title, description, completed: true, version: 2 }
```

### Viewing Event History
```
GET /event-sourcing/tasks/task-123/history

Response:
[
  {
    type: "TaskCreated",
    version: 1,
    timestamp: "2026-01-27T12:00:00Z",
    data: { title: "Learn ES", description: "..." }
  },
  {
    type: "TaskCompleted",
    version: 2,
    timestamp: "2026-01-27T12:05:00Z",
    data: {}
  }
]
```

## Advanced Patterns

### Snapshots
For long event streams, take periodic snapshots:
```typescript
// Instead of replaying 1000 events
events = eventStore.getEvents(id, fromVersion: 800);
snapshot = eventStore.getSnapshot(id, version: 800);
task = EventSourcedTask.fromSnapshot(snapshot);
for event in events:
    task.applyEvent(event);
```

### Temporal Queries
Get state at any point in time:
```typescript
events = eventStore.getEvents(id).filter(e => e.timestamp < targetTime);
task = EventSourcedTask.fromEvents(events);
// task now represents state at targetTime
```

### Event Versioning
Handle evolving event schemas:
```typescript
const eventV1 = { type: "TaskCreated", title: "..." };
const eventV2 = { type: "TaskCreated", title: "...", priority: "..." };

// Upcaster transforms old events to new schema
function upcastTaskCreatedV1ToV2(eventV1): EventV2 {
  return { ...eventV1, priority: "medium" };
}
```

### Event-Driven Side Effects
Trigger actions on events:
```typescript
eventBus.subscribe('TaskCompleted', (event) => {
  notification.send(event.userId, `Task completed!`);
  analytics.track('task_completed', event.aggregateId);
});
```

## File Structure

```
event-sourcing-example/
├── domain/
│   ├── events/
│   │   └── task.events.ts          # Domain events (immutable facts)
│   └── aggregate/
│       └── event-sourced-task.aggregate.ts  # Aggregate (rehydrates from events)
│
├── application/
│   ├── ports/
│   │   └── event.store.ts          # Event store interface
│   ├── services/
│   │   └── event-sourcing.service.ts  # Application logic
│   └── projections/
│       └── task-read-model.projection.ts # Read model (denormalized for queries)
│
├── infrastructure/
│   └── event-store/
│       └── in-memory-event.store.ts  # Event store adapter
│
├── presentation/
│   └── event-sourcing.controller.ts # REST endpoints
│
└── event-sourcing-example.module.ts # NestJS module
```

## Testing Event Sourcing

Event sourcing makes testing easy:

```typescript
describe('Task Event Sourcing', () => {
  it('should rehydrate task from events', () => {
    const events = [
      new TaskCreatedEvent("1", "Task", "Desc"),
      new TaskCompletedEvent("1"),
    ];
    
    const task = EventSourcedTask.fromEvents(events);
    
    expect(task.completed).toBe(true);
    expect(task.currentVersion).toBe(2);
  });

  it('should record events on command', () => {
    const task = EventSourcedTask.create("1", "Task", "Desc");
    task.complete();
    
    const events = task.getUncommittedEvents();
    expect(events).toHaveLength(2); // Created + Completed
  });
});
```

## Comparison with Other Patterns

| Aspect | Traditional CRUD | CQRS | Event Sourcing |
|--------|-----------------|------|----------------|
| **State Storage** | Current state | Current state | Events (immutable) |
| **Audit Trail** | ❌ Need logs | ⚠️ With special handling | ✅ Built-in |
| **Temporal Queries** | ❌ No | ❌ No | ✅ Yes |
| **Scalability** | ⚠️ Update contention | ✅ Good | ✅ Excellent |
| **Complexity** | ✅ Low | ⚠️ Medium | ⚠️ High |
| **Testing** | ⚠️ Database needed | ✅ Good | ✅ Excellent |

## Learn More

- [Martin Fowler - Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)
- [Greg Young - Event Sourcing](https://www.youtube.com/watch?v=JHGkaShoyNs)
- [NestJS & Event Sourcing](https://docs.nestjs.com/techniques/events)
