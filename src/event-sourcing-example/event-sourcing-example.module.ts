import { Module } from '@nestjs/common';
import { EventSourcingController } from './presentation/event-sourcing.controller';
import { EventSourcingService } from './application/services/event-sourcing.service';
import { TaskReadModelProjection } from './application/projections/task-read-model.projection';
import { InMemoryEventStore } from './infrastructure/event-store/in-memory-event.store';
import { EVENT_STORE } from './application/ports/event.store';

/**
 * Event Sourcing Example Module
 *
 * This module demonstrates the Event Sourcing pattern:
 *
 * Core Concepts:
 * 1. Events are the source of truth (not state)
 * 2. State is rehydrated by replaying events
 * 3. Complete audit trail of all changes
 * 4. Temporal queries (state at any point in time)
 * 5. Read models are derived from events
 *
 * Architecture:
 * - Domain Events: Immutable facts about what happened
 * - Event Sourced Aggregate: Records events and rehydrates from them
 * - Event Store: Persistence layer for events
 * - Read Model Projection: Denormalized data for fast queries
 * - Event Sourcing Service: Application logic and orchestration
 *
 * API Endpoints:
 * POST   /event-sourcing/tasks              - Create task
 * GET    /event-sourcing/tasks              - Get all tasks (from read model)
 * GET    /event-sourcing/tasks/:id          - Get task
 * GET    /event-sourcing/tasks/:id/history  - Get event history/audit trail
 * PUT    /event-sourcing/tasks/:id          - Update task
 * PATCH  /event-sourcing/tasks/:id/complete - Mark complete
 * DELETE /event-sourcing/tasks/:id          - Delete task
 *
 * Advantages over traditional CRUD:
 * - Complete audit trail
 * - Temporal queries (state at any time)
 * - Easy to test (replay events)
 * - Scalability (append-only writes)
 * - Event-driven architecture (trigger side effects)
 *
 * Trade-offs:
 * - Eventual consistency in read models
 * - Storage (all events, not just state)
 * - Complexity in querying
 * - Snapshots needed for very long event streams
 */
@Module({
  controllers: [EventSourcingController],
  providers: [
    EventSourcingService,
    TaskReadModelProjection,
    InMemoryEventStore,
    {
      provide: EVENT_STORE,
      useClass: InMemoryEventStore,
    },
  ],
})
export class EventSourcingExampleModule {}
