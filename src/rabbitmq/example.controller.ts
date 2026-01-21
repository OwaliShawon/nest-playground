import { Controller, Post, Get, Body, Logger } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';
import { RabbitMQService } from './rabbitmq.service';

@Controller('rabbitmq')
export class ExampleController {
  private readonly logger = new Logger(ExampleController.name);

  constructor(
    private readonly publisherService: PublisherService,
    private readonly subscriberService: SubscriberService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Post('setup-fanout')
  async setupFanoutExample() {
    try {
      const exchange = 'notifications_exchange';
      const queue1 = 'notifications_queue_1';
      const queue2 = 'notifications_queue_2';

      // Assert exchange and queues
      await this.rabbitMQService.assertExchange(exchange, 'fanout');
      await this.rabbitMQService.assertQueue(queue1);
      await this.rabbitMQService.assertQueue(queue2);

      // Bind queues to exchange
      await this.rabbitMQService.bindQueue(queue1, exchange, '');
      await this.rabbitMQService.bindQueue(queue2, exchange, '');

      // Subscribe to both queues
      await this.subscriberService.subscribeToExchange(
        exchange,
        queue1,
        '',
        async (message, ack, nack) => {
          this.logger.log(`Queue 1 received: ${JSON.stringify(message)}`);
          ack();
        },
      );

      await this.subscriberService.subscribeToExchange(
        exchange,
        queue2,
        '',
        async (message, ack, nack) => {
          this.logger.log(`Queue 2 received: ${JSON.stringify(message)}`);
          ack();
        },
      );

      return { success: true, message: 'Fanout setup complete' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('setup-topic')
  async setupTopicExample() {
    try {
      const exchange = 'logs_exchange';
      const infoQueue = 'info_logs_queue';
      const errorQueue = 'error_logs_queue';
      const allQueue = 'all_logs_queue';

      // Assert exchange and queues
      await this.rabbitMQService.assertExchange(exchange, 'topic');
      await this.rabbitMQService.assertQueue(infoQueue);
      await this.rabbitMQService.assertQueue(errorQueue);
      await this.rabbitMQService.assertQueue(allQueue);

      // Bind queues with routing keys
      await this.rabbitMQService.bindQueue(infoQueue, exchange, 'logs.info');
      await this.rabbitMQService.bindQueue(errorQueue, exchange, 'logs.error');
      await this.rabbitMQService.bindQueue(allQueue, exchange, 'logs.*');

      // Subscribe to all queues
      await this.subscriberService.subscribeToExchange(
        exchange,
        infoQueue,
        'logs.info',
        async (message, ack, nack) => {
          this.logger.log(`Info log received: ${JSON.stringify(message)}`);
          ack();
        },
      );

      await this.subscriberService.subscribeToExchange(
        exchange,
        errorQueue,
        'logs.error',
        async (message, ack, nack) => {
          this.logger.error(`Error log received: ${JSON.stringify(message)}`);
          ack();
        },
      );

      await this.subscriberService.subscribeToExchange(
        exchange,
        allQueue,
        'logs.*',
        async (message, ack, nack) => {
          this.logger.log(`All logs received: ${JSON.stringify(message)}`);
          ack();
        },
      );

      return { success: true, message: 'Topic setup complete' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('publish-notification')
  async publishNotification(@Body() payload: any) {
    try {
      const result = await this.publisherService.publishToExchange(
        'notifications_exchange',
        '',
        {
          timestamp: new Date(),
          message: payload.message,
          type: 'notification',
        },
      );

      return { success: result, message: 'Notification published' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('publish-log')
  async publishLog(@Body() payload: any) {
    try {
      const routingKey = payload.level === 'error' ? 'logs.error' : 'logs.info';

      const result = await this.publisherService.publishToExchange(
        'logs_exchange',
        routingKey,
        {
          timestamp: new Date(),
          level: payload.level,
          message: payload.message,
        },
      );

      return { success: result, message: 'Log published' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('publish-to-queue')
  async publishToQueue(@Body() payload: any) {
    try {
      const result = await this.publisherService.publishToQueue(
        'task_queue',
        {
          taskId: payload.taskId,
          data: payload.data,
          timestamp: new Date(),
        },
      );

      return { success: result, message: 'Message published to queue' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('subscribe-to-queue')
  async subscribeToQueue() {
    try {
      await this.rabbitMQService.assertQueue('task_queue');

      await this.subscriberService.subscribe(
        'task_queue',
        async (message, ack, nack) => {
          try {
            this.logger.log(`Processing task: ${JSON.stringify(message)}`);
            // Simulate processing
            await new Promise((resolve) => setTimeout(resolve, 1000));
            ack();
          } catch (error) {
            this.logger.error(`Task processing failed: ${error.message}`);
            nack(true); // Requeue on error
          }
        },
      );

      return { success: true, message: 'Subscribed to task queue' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('health')
  async health() {
    try {
      const connection = this.rabbitMQService.getConnection();
      return {
        status: 'connected',
        connection: !!connection,
      };
    } catch (error) {
      return {
        status: 'disconnected',
        error: error.message,
      };
    }
  }
}
