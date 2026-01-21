# RabbitMQ Pub/Sub Module

A complete RabbitMQ pub/sub module for NestJS with support for multiple exchange types (fanout, topic, direct) and queue patterns.

## Installation

First, install the required dependencies:

```bash
npm install amqplib
npm install --save-dev @types/amqplib
```

## Features

- **RabbitMQ Service**: Core service for managing RabbitMQ connections and channels
- **Publisher Service**: Publish messages to exchanges and queues
- **Subscriber Service**: Subscribe to exchanges and queues with message handling
- **Multiple Exchange Types**: Support for fanout, topic, direct, and headers exchanges
- **Message Acknowledgment**: Automatic message acknowledgment and requeue on error
- **Configuration**: Configurable via environment variables

## Configuration

Set the following environment variables in your `.env` file:

```env
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_VHOST=/
```

## Project Structure

```
src/rabbitmq/
├── rabbitmq.config.ts          # Configuration interface and defaults
├── rabbitmq.service.ts         # Core RabbitMQ connection management
├── publisher.service.ts        # Message publishing service
├── subscriber.service.ts       # Message subscription service
├── example.controller.ts       # Example REST endpoints
├── rabbitmq.module.ts          # Core RabbitMQ module
└── rabbitmq.example.module.ts  # Example module with controller
```

## Usage

### Import Module

```typescript
import { RabbitMQExampleModule } from './rabbitmq/rabbitmq.example.module';

@Module({
  imports: [RabbitMQExampleModule],
})
export class AppModule {}
```

Or import just the core module:

```typescript
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
})
export class YourModule {}
```

### Publishing Messages

#### Publish to Exchange

```typescript
import { Injectable } from '@nestjs/common';
import { PublisherService } from './rabbitmq/publisher.service';

@Injectable()
export class YourService {
  constructor(private publisherService: PublisherService) {}

  async publishNotification() {
    await this.publisherService.publishToExchange(
      'notifications_exchange',
      'routing.key',
      {
        title: 'Hello',
        message: 'World',
      },
    );
  }
}
```

#### Publish to Queue

```typescript
await this.publisherService.publishToQueue(
  'task_queue',
  {
    taskId: '123',
    data: { /* ... */ },
  },
);
```

### Subscribing to Messages

#### Subscribe to Queue

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SubscriberService } from './rabbitmq/subscriber.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class YourService implements OnModuleInit {
  constructor(
    private subscriberService: SubscriberService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    // Ensure queue exists
    await this.rabbitMQService.assertQueue('task_queue');

    // Subscribe with message handler
    await this.subscriberService.subscribe(
      'task_queue',
      async (message, ack, nack) => {
        try {
          console.log('Processing task:', message);
          // Your processing logic here
          ack(); // Acknowledge message
        } catch (error) {
          nack(true); // Requeue on error
        }
      },
    );
  }
}
```

#### Subscribe to Exchange (Topic)

```typescript
async onModuleInit() {
  // Setup exchange
  await this.rabbitMQService.assertExchange('logs_exchange', 'topic');
  await this.rabbitMQService.assertQueue('error_logs');
  await this.rabbitMQService.bindQueue(
    'error_logs',
    'logs_exchange',
    'logs.error',
  );

  // Subscribe
  await this.subscriberService.subscribeToExchange(
    'logs_exchange',
    'error_logs',
    'logs.error',
    async (message, ack, nack) => {
      console.log('Error log:', message);
      ack();
    },
  );
}
```

#### Subscribe to Exchange (Fanout)

```typescript
async onModuleInit() {
  // Setup fanout exchange
  await this.rabbitMQService.assertExchange(
    'notifications_exchange',
    'fanout',
  );
  await this.rabbitMQService.assertQueue('notifications_queue_1');
  await this.rabbitMQService.bindQueue(
    'notifications_queue_1',
    'notifications_exchange',
    '',
  );

  // Subscribe (empty routing key for fanout)
  await this.subscriberService.subscribeToExchange(
    'notifications_exchange',
    'notifications_queue_1',
    '',
    async (message, ack, nack) => {
      console.log('Notification:', message);
      ack();
    },
  );
}
```

## Exchange Types

### 1. **Direct Exchange**

Routes messages to a single queue based on exact routing key match.

```typescript
await this.rabbitMQService.assertExchange('order_exchange', 'direct');
await this.rabbitMQService.assertQueue('order_queue');
await this.rabbitMQService.bindQueue(
  'order_queue',
  'order_exchange',
  'order.created',
);

// Publish to direct exchange
await this.publisherService.publishToExchange(
  'order_exchange',
  'order.created',
  { orderId: 123 },
);
```

### 2. **Topic Exchange**

Routes messages based on wildcard pattern matching on routing keys.

Patterns:
- `logs.info` - exact match
- `logs.*` - matches logs.info, logs.error, logs.debug
- `logs.#` - matches logs.info, logs.error.critical, etc.

```typescript
await this.rabbitMQService.assertExchange('logs_exchange', 'topic');
await this.rabbitMQService.assertQueue('info_logs');
await this.rabbitMQService.assertQueue('error_logs');

await this.rabbitMQService.bindQueue(
  'info_logs',
  'logs_exchange',
  'logs.info',
);
await this.rabbitMQService.bindQueue(
  'error_logs',
  'logs_exchange',
  'logs.error',
);
```

### 3. **Fanout Exchange**

Broadcasts messages to all bound queues regardless of routing key.

```typescript
await this.rabbitMQService.assertExchange(
  'notifications_exchange',
  'fanout',
);
await this.rabbitMQService.assertQueue('queue_1');
await this.rabbitMQService.assertQueue('queue_2');

// Bind with empty routing key
await this.rabbitMQService.bindQueue('queue_1', 'notifications_exchange', '');
await this.rabbitMQService.bindQueue('queue_2', 'notifications_exchange', '');

// All queues receive the message
await this.publisherService.publishToExchange(
  'notifications_exchange',
  '',
  { message: 'Broadcast message' },
);
```

### 4. **Headers Exchange**

Routes based on message headers rather than routing keys.

```typescript
await this.rabbitMQService.assertExchange(
  'headers_exchange',
  'headers',
);
```

## API Examples

The module includes example endpoints at `/rabbitmq`:

### 1. Setup Fanout Example

```http
POST /rabbitmq/setup-fanout
```

Sets up fanout exchange with two queues that both receive all messages.

### 2. Setup Topic Example

```http
POST /rabbitmq/setup-topic
```

Sets up topic exchange with routing key patterns for logs.

### 3. Publish Notification

```http
POST /rabbitmq/publish-notification
Content-Type: application/json

{
  "message": "Hello, subscribers!"
}
```

### 4. Publish Log

```http
POST /rabbitmq/publish-log
Content-Type: application/json

{
  "level": "error",
  "message": "An error occurred"
}
```

### 5. Publish to Queue

```http
POST /rabbitmq/publish-to-queue
Content-Type: application/json

{
  "taskId": "task-001",
  "data": { "foo": "bar" }
}
```

### 6. Subscribe to Queue

```http
POST /rabbitmq/subscribe-to-queue
```

### 7. Health Check

```http
GET /rabbitmq/health
```

## Error Handling

The module includes automatic error handling:

- **Message Processing Errors**: Failed messages are automatically requeued
- **Connection Errors**: Logged and thrown for upstream handling
- **Channel Errors**: Proper error logging with context

## Message Acknowledgment

Messages must be explicitly acknowledged in handlers:

```typescript
await this.subscriberService.subscribe(
  'queue_name',
  async (message, ack, nack) => {
    try {
      // Process message
      ack(); // Acknowledge success
    } catch (error) {
      nack(true); // Requeue on error (true requeues, false discards)
    }
  },
);
```

## Message Persistence

By default, messages are marked as persistent:

```typescript
// Persist message (survives broker restart)
await this.publisherService.publishToExchange(
  'exchange',
  'routing.key',
  message,
  { persistent: true }, // default
);

// Non-persistent message
await this.publisherService.publishToExchange(
  'exchange',
  'routing.key',
  message,
  { persistent: false },
);
```

## Prefetch Configuration

Control the number of unacknowledged messages a consumer can hold:

```typescript
// Default prefetch: 1
await this.subscriberService.subscribe(
  'queue_name',
  handler,
  1, // prefetch count
);
```

## Docker Setup (Optional)

To run RabbitMQ locally with Docker:

```bash
docker run -d --name rabbitmq \
  -p 5672:15672 \
  -p 15672:15672 \
  rabbitmq:3.12-management

# RabbitMQ Management UI: http://localhost:15672
# Username: guest
# Password: guest
```

## Common Patterns

### Worker Queue Pattern

Multiple consumers process tasks from a single queue:

```typescript
// Producer
await this.publisherService.publishToQueue('tasks', { taskData: '...' });

// Multiple workers
for (let i = 0; i < 3; i++) {
  await this.subscriberService.subscribe(
    'tasks',
    async (message, ack) => {
      console.log(`Worker ${i} processing:`, message);
      ack();
    },
  );
}
```

### Pub/Sub Pattern

Multiple subscribers receive the same message:

```typescript
// Use fanout exchange
await this.rabbitMQService.assertExchange('events', 'fanout');
// Create multiple queues bound to same exchange
```

### Routing Pattern

Different types of messages go to different queues:

```typescript
// Use topic exchange
await this.rabbitMQService.assertExchange('logs', 'topic');
// Use routing key patterns for filtering
```

## Troubleshooting

### Cannot Connect to RabbitMQ

1. Ensure RabbitMQ is running
2. Check host, port, and credentials in environment variables
3. Verify network connectivity

### Messages Not Delivered

1. Ensure exchange and queue are declared
2. Verify queue is bound to exchange with correct routing key
3. Check message format is JSON serializable

### Messages Stuck in Queue

1. Ensure consumer is acknowledging messages
2. Check consumer for errors causing nack with requeue
3. Monitor prefetch count

## License

MIT
