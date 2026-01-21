# RabbitMQ Module - Complete Reference Guide

## 📋 Table of Contents
1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Reference](#api-reference)
4. [Exchange Types](#exchange-types)
5. [Common Patterns](#common-patterns)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Installation

### 1. Install Dependencies
```bash
npm install amqplib
npm install --save-dev @types/amqplib
```

### 2. Configure Environment
Create/update `.env`:
```env
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_VHOST=/
```

### 3. Start RabbitMQ
```bash
# Using Docker Compose
bash scripts/setup-rabbitmq.sh

# Or manually
docker-compose -f docker-compose.rabbitmq.yml up -d
```

---

## Configuration

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `RABBITMQ_HOST` | localhost | RabbitMQ server hostname |
| `RABBITMQ_PORT` | 5672 | AMQP protocol port |
| `RABBITMQ_USER` | guest | Authentication username |
| `RABBITMQ_PASSWORD` | guest | Authentication password |
| `RABBITMQ_VHOST` | / | Virtual host |

### Module Setup
```typescript
// Core module only
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

// With example controller
import { RabbitMQExampleModule } from './rabbitmq/rabbitmq.example.module';

@Module({
  imports: [RabbitMQExampleModule],
})
export class AppModule {}
```

---

## API Reference

### RabbitMQService

#### Methods

##### `async assertExchange(exchange: string, type: ExchangeType, durable?: boolean)`
Declare an exchange if it doesn't exist.

**Parameters:**
- `exchange` - Exchange name
- `type` - 'direct' | 'fanout' | 'topic' | 'headers'
- `durable` - Persist after restart (default: true)

**Example:**
```typescript
await this.rabbitMQService.assertExchange('orders', 'topic');
```

---

##### `async assertQueue(queue: string, durable?: boolean)`
Declare a queue if it doesn't exist.

**Parameters:**
- `queue` - Queue name
- `durable` - Persist after restart (default: true)

**Example:**
```typescript
await this.rabbitMQService.assertQueue('task_queue');
```

---

##### `async bindQueue(queue: string, exchange: string, routingKey: string)`
Bind a queue to an exchange with a routing key.

**Parameters:**
- `queue` - Queue name
- `exchange` - Exchange name
- `routingKey` - Routing key pattern

**Example:**
```typescript
await this.rabbitMQService.bindQueue(
  'error_logs',
  'logs',
  'logs.error'
);
```

---

##### `getConnection(): Connection`
Get the raw amqplib connection object.

##### `getChannel(): Channel`
Get the raw amqplib channel object.

---

### PublisherService

#### Methods

##### `async publishToExchange(exchange: string, routingKey: string, message: any, options?: Options)`
Publish a message to an exchange.

**Parameters:**
- `exchange` - Exchange name
- `routingKey` - Routing key
- `message` - Message payload (will be JSON stringified)
- `options.persistent` - Default: true

**Returns:** `Promise<boolean>` - Success status

**Example:**
```typescript
const success = await this.publisherService.publishToExchange(
  'orders',
  'order.created',
  { orderId: 123, total: 99.99 }
);
```

---

##### `async publishToQueue(queue: string, message: any, options?: Options)`
Publish a message directly to a queue.

**Parameters:**
- `queue` - Queue name
- `message` - Message payload
- `options.persistent` - Default: true

**Returns:** `Promise<boolean>` - Success status

**Example:**
```typescript
await this.publisherService.publishToQueue(
  'tasks',
  { taskType: 'email', userId: 456 }
);
```

---

### SubscriberService

#### Types
```typescript
type MessageHandler = (
  message: any,
  ack: () => void,
  nack: (requeue?: boolean) => void
) => Promise<void>;
```

#### Methods

##### `async subscribe(queue: string, handler: MessageHandler, prefetch?: number)`
Subscribe to a queue directly.

**Parameters:**
- `queue` - Queue name
- `handler` - Message handler function
- `prefetch` - Max unack messages (default: 1)

**Example:**
```typescript
await this.subscriberService.subscribe(
  'tasks',
  async (message, ack, nack) => {
    try {
      console.log('Processing:', message);
      ack();
    } catch (error) {
      nack(true); // Requeue on error
    }
  }
);
```

---

##### `async subscribeToExchange(exchange: string, queue: string, routingKey: string, handler: MessageHandler, prefetch?: number)`
Subscribe to an exchange through a queue.

**Parameters:**
- `exchange` - Exchange name
- `queue` - Queue name
- `routingKey` - Routing key pattern
- `handler` - Message handler function
- `prefetch` - Max unack messages (default: 1)

**Example:**
```typescript
await this.subscriberService.subscribeToExchange(
  'orders',
  'email_notifications',
  'order.*',
  async (message, ack, nack) => {
    await sendEmail(message);
    ack();
  }
);
```

---

## Exchange Types

### Direct Exchange

Routes to queues with exact routing key match.

**Best for:** Command routing

**Setup:**
```typescript
await this.rabbitMQService.assertExchange('commands', 'direct');
await this.rabbitMQService.assertQueue('email_commands');
await this.rabbitMQService.assertQueue('sms_commands');

await this.rabbitMQService.bindQueue(
  'email_commands',
  'commands',
  'send_email'
);
await this.rabbitMQService.bindQueue(
  'sms_commands',
  'commands',
  'send_sms'
);
```

**Publishing:**
```typescript
// Goes to email_commands queue only
await this.publisherService.publishToExchange(
  'commands',
  'send_email',
  { to: 'user@example.com', message: 'Hello' }
);

// Goes to sms_commands queue only
await this.publisherService.publishToExchange(
  'commands',
  'send_sms',
  { phone: '+1234567890', message: 'Hi' }
);
```

---

### Topic Exchange

Routes based on wildcard patterns in routing keys.

**Patterns:**
- `logs.info` - Exact match
- `logs.*` - One word after "logs."
- `logs.#` - Any number of words after "logs."

**Setup:**
```typescript
await this.rabbitMQService.assertExchange('logs', 'topic');
await this.rabbitMQService.assertQueue('info_logs');
await this.rabbitMQService.assertQueue('error_logs');
await this.rabbitMQService.assertQueue('all_logs');

await this.rabbitMQService.bindQueue('info_logs', 'logs', 'logs.info');
await this.rabbitMQService.bindQueue('error_logs', 'logs', 'logs.error');
await this.rabbitMQService.bindQueue('all_logs', 'logs', 'logs.#');
```

**Publishing:**
```typescript
// Goes to info_logs and all_logs
await this.publisherService.publishToExchange(
  'logs',
  'logs.info',
  { message: 'Info message' }
);

// Goes to error_logs and all_logs
await this.publisherService.publishToExchange(
  'logs',
  'logs.error.critical',
  { message: 'Critical error' }
);
```

---

### Fanout Exchange

Broadcasts to all bound queues, ignores routing key.

**Best for:** Broadcasting

**Setup:**
```typescript
await this.rabbitMQService.assertExchange(
  'notifications',
  'fanout'
);
await this.rabbitMQService.assertQueue('email_notify');
await this.rabbitMQService.assertQueue('sms_notify');
await this.rabbitMQService.assertQueue('push_notify');

// Empty routing key for fanout
await this.rabbitMQService.bindQueue('email_notify', 'notifications', '');
await this.rabbitMQService.bindQueue('sms_notify', 'notifications', '');
await this.rabbitMQService.bindQueue('push_notify', 'notifications', '');
```

**Publishing:**
```typescript
// All three queues receive the message
await this.publisherService.publishToExchange(
  'notifications',
  '', // Empty routing key for fanout
  { title: 'System Update', message: 'Maintenance window' }
);
```

---

## Common Patterns

### Pattern 1: Worker Queue
Multiple workers process tasks with load balancing.

```typescript
@Injectable()
export class TaskProcessorService implements OnModuleInit {
  constructor(
    private subscriber: SubscriberService,
    private rabbitmq: RabbitMQService
  ) {}

  async onModuleInit() {
    await this.rabbitmq.assertQueue('tasks');

    // 3 workers share the load
    for (let i = 0; i < 3; i++) {
      await this.subscriber.subscribe(
        'tasks',
        async (msg, ack) => {
          console.log(`Worker ${i} processing:`, msg);
          ack();
        },
        1 // Prefetch 1 for fair dispatch
      );
    }
  }
}
```

---

### Pattern 2: Pub/Sub with Fanout
One event, multiple interested parties.

```typescript
@Injectable()
export class UserEventService implements OnModuleInit {
  constructor(
    private publisher: PublisherService,
    private subscriber: SubscriberService,
    private rabbitmq: RabbitMQService
  ) {}

  async onModuleInit() {
    await this.rabbitmq.assertExchange('user_events', 'fanout');

    // Email service
    await this.rabbitmq.assertQueue('user_events_email');
    await this.rabbitmq.bindQueue('user_events_email', 'user_events', '');
    await this.subscriber.subscribeToExchange(
      'user_events',
      'user_events_email',
      '',
      async (msg, ack) => {
        console.log('Sending email for:', msg);
        ack();
      }
    );

    // Analytics service
    await this.rabbitmq.assertQueue('user_events_analytics');
    await this.rabbitmq.bindQueue('user_events_analytics', 'user_events', '');
    await this.subscriber.subscribeToExchange(
      'user_events',
      'user_events_analytics',
      '',
      async (msg, ack) => {
        console.log('Tracking analytics:', msg);
        ack();
      }
    );
  }

  publishUserCreated(user: any) {
    return this.publisher.publishToExchange(
      'user_events',
      '',
      { event: 'user.created', user }
    );
  }
}
```

---

### Pattern 3: Routing by Type
Different message types handled by different services.

```typescript
@Injectable()
export class EventRouter implements OnModuleInit {
  constructor(
    private subscriber: SubscriberService,
    private rabbitmq: RabbitMQService
  ) {}

  async onModuleInit() {
    await this.rabbitmq.assertExchange('events', 'direct');

    // Order queue
    await this.rabbitmq.assertQueue('order_events');
    await this.rabbitmq.bindQueue('order_events', 'events', 'order');
    await this.subscriber.subscribeToExchange(
      'events',
      'order_events',
      'order',
      async (msg, ack) => {
        console.log('Processing order:', msg);
        ack();
      }
    );

    // Payment queue
    await this.rabbitmq.assertQueue('payment_events');
    await this.rabbitmq.bindQueue('payment_events', 'events', 'payment');
    await this.subscriber.subscribeToExchange(
      'events',
      'payment_events',
      'payment',
      async (msg, ack) => {
        console.log('Processing payment:', msg);
        ack();
      }
    );
  }
}
```

---

## Testing

### REST Endpoints

The module includes test endpoints at `/rabbitmq`:

```http
### Setup fanout
POST /rabbitmq/setup-fanout

### Setup topic
POST /rabbitmq/setup-topic

### Publish notification
POST /rabbitmq/publish-notification
Content-Type: application/json

{ "message": "Test message" }

### Publish log
POST /rabbitmq/publish-log
Content-Type: application/json

{ "level": "error", "message": "Test error" }

### Check health
GET /rabbitmq/health
```

---

## Troubleshooting

### Problem: Cannot connect to RabbitMQ

**Solution:**
```bash
# Check if RabbitMQ is running
docker ps | grep rabbitmq

# If not, start it
bash scripts/setup-rabbitmq.sh

# Check logs
docker logs practice-nest-rabbitmq
```

---

### Problem: Messages not being received

**Checklist:**
- [ ] Exchange exists: `await this.rabbitmq.assertExchange(...)`
- [ ] Queue exists: `await this.rabbitmq.assertQueue(...)`
- [ ] Queue is bound: `await this.rabbitmq.bindQueue(...)`
- [ ] Routing key matches
- [ ] Subscriber is subscribed
- [ ] Consumer is not crashing

---

### Problem: Memory usage growing

**Solution:**
- Ensure all messages are acknowledged
- Check for infinite requeue loops
- Monitor RabbitMQ UI: http://localhost:15672
- Consider reducing message persistence

---

### Problem: Processing taking too long

**Solutions:**
- Reduce prefetch: `subscriber.subscribe(queue, handler, 1)`
- Increase worker count
- Optimize handler logic
- Use async operations

---

## Performance Tips

1. **Prefetch Count:** 
   - Lower (1-2) for long-running tasks
   - Higher (10-100) for quick tasks

2. **Message Persistence:**
   - Use for critical messages
   - Disable for high throughput scenarios

3. **Batching:**
   - Accumulate messages before processing
   - Reduces database writes

4. **Connection Pooling:**
   - Each service can have one connection
   - Multiple channels per connection

5. **Monitoring:**
   - Watch RabbitMQ Management UI
   - Log message processing times
   - Alert on queue depth

---

## Useful Commands

```bash
# Docker compose
docker-compose -f docker-compose.rabbitmq.yml up -d
docker-compose -f docker-compose.rabbitmq.yml down
docker-compose -f docker-compose.rabbitmq.yml logs -f

# Docker logs
docker logs practice-nest-rabbitmq -f

# Access RabbitMQ CLI
docker exec -it practice-nest-rabbitmq bash

# Inside RabbitMQ container
rabbitmqctl list_exchanges
rabbitmqctl list_queues
rabbitmqctl list_bindings
```

---

## Resources

- **RabbitMQ Official:** https://www.rabbitmq.com
- **amqplib Docs:** https://github.com/squaremo/amqplib
- **NestJS Microservices:** https://docs.nestjs.com/microservices/overview
- **RabbitMQ Tutorial:** https://www.rabbitmq.com/tutorials

---

**Last Updated:** January 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
