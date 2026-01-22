// Real-world examples using the RabbitMQ module

// EXAMPLE 1: E-COMMERCE ORDER PROCESSING
// =========================================

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class OrderProcessingService implements OnModuleInit {
  constructor(
    private publisherService: PublisherService,
    private subscriberService: SubscriberService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    await this.setupOrderProcessing();
  }

  private async setupOrderProcessing() {
    // Setup topic exchange for orders
    await this.rabbitMQService.assertExchange('orders', 'topic');

    // Queue for payment processing
    await this.rabbitMQService.assertQueue('payment_queue');
    await this.rabbitMQService.bindQueue(
      'payment_queue',
      'orders',
      'order.created',
    );

    // Queue for inventory updates
    await this.rabbitMQService.assertQueue('inventory_queue');
    await this.rabbitMQService.bindQueue(
      'inventory_queue',
      'orders',
      'order.created',
    );

    // Queue for notifications
    await this.rabbitMQService.assertQueue('notification_queue');
    await this.rabbitMQService.bindQueue(
      'notification_queue',
      'orders',
      'order.*', // all order events
    );

    // Payment handler
    await this.subscriberService.subscribeToExchange(
      'orders',
      'payment_queue',
      'order.created',
      async (message, ack, nack) => {
        try {
          console.log('Processing payment for order:', message.orderId);
          // Process payment
          await this.processPayment(message);
          ack();
        } catch (error) {
          console.error('Payment processing failed:', error);
          nack(true); // Requeue
        }
      },
    );

    // Inventory handler
    await this.subscriberService.subscribeToExchange(
      'orders',
      'inventory_queue',
      'order.created',
      async (message, ack, nack) => {
        try {
          console.log('Updating inventory for order:', message.orderId);
          // Update inventory
          await this.updateInventory(message);
          ack();
        } catch (error) {
          console.error('Inventory update failed:', error);
          nack(true);
        }
      },
    );

    // Notification handler
    await this.subscriberService.subscribeToExchange(
      'orders',
      'notification_queue',
      'order.*',
      async (message, ack, nack) => {
        try {
          console.log('Sending notification for order event:', message);
          // Send email/SMS
          await this.sendNotification(message);
          ack();
        } catch (error) {
          console.error('Notification failed:', error);
          nack(true);
        }
      },
    );
  }

  async createOrder(orderData: any) {
    // Save order to database
    const orderId = Math.random().toString(36).substr(2, 9);

    // Publish order.created event
    await this.publisherService.publishToExchange('orders', 'order.created', {
      orderId,
      customerId: orderData.customerId,
      items: orderData.items,
      total: orderData.total,
      timestamp: new Date(),
    });

    // Later, publish order.confirmed event
    // await this.publisherService.publishToExchange('orders', 'order.confirmed', {...});
  }

  private async processPayment(orderData: any) {
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Payment processed successfully');
  }

  private async updateInventory(orderData: any) {
    // Simulate inventory update
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Inventory updated');
  }

  private async sendNotification(message: any) {
    // Send notification
    console.log('Notification sent to customer');
  }
}

// EXAMPLE 2: LOG AGGREGATION SYSTEM
// ==================================

@Injectable()
export class LogAggregationService implements OnModuleInit {
  constructor(
    private publisherService: PublisherService,
    private subscriberService: SubscriberService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    await this.setupLogAggregation();
  }

  private async setupLogAggregation() {
    // Topic exchange for logs
    await this.rabbitMQService.assertExchange('logs', 'topic');

    // Error logs queue
    await this.rabbitMQService.assertQueue('error_logs');
    await this.rabbitMQService.bindQueue('error_logs', 'logs', 'logs.error');

    // Warning logs queue
    await this.rabbitMQService.assertQueue('warning_logs');
    await this.rabbitMQService.bindQueue('warning_logs', 'logs', 'logs.warn');

    // All logs queue (for archival)
    await this.rabbitMQService.assertQueue('all_logs');
    await this.rabbitMQService.bindQueue('all_logs', 'logs', 'logs.*');

    // Error log handler - alerts team
    await this.subscriberService.subscribeToExchange(
      'logs',
      'error_logs',
      'logs.error',
      async (message, ack) => {
        console.error('ALERT: ', message.message);
        // Send alert to Slack/PagerDuty
        ack();
      },
    );

    // All logs handler - store in database
    await this.subscriberService.subscribeToExchange(
      'logs',
      'all_logs',
      'logs.*',
      async (message, ack) => {
        // Store in database for analysis
        await this.storeLog(message);
        ack();
      },
    );
  }

  async logInfo(message: string, metadata: any = {}) {
    await this.publisherService.publishToExchange('logs', 'logs.info', {
      level: 'info',
      message,
      metadata,
      timestamp: new Date(),
      service: 'my-service',
    });
  }

  async logError(error: Error, metadata: any = {}) {
    await this.publisherService.publishToExchange('logs', 'logs.error', {
      level: 'error',
      message: error.message,
      stack: error.stack,
      metadata,
      timestamp: new Date(),
      service: 'my-service',
    });
  }

  async logWarning(message: string, metadata: any = {}) {
    await this.publisherService.publishToExchange('logs', 'logs.warn', {
      level: 'warn',
      message,
      metadata,
      timestamp: new Date(),
      service: 'my-service',
    });
  }

  private async storeLog(logEntry: any) {
    // Store in database
    console.log('Storing log:', logEntry.message);
  }
}

// EXAMPLE 3: BACKGROUND TASK QUEUE
// ==================================

@Injectable()
export class BackgroundTaskService implements OnModuleInit {
  constructor(
    private publisherService: PublisherService,
    private subscriberService: SubscriberService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    await this.setupBackgroundTasks();
  }

  private async setupBackgroundTasks() {
    // Create task queue
    await this.rabbitMQService.assertQueue('background_tasks');

    // Multiple workers can subscribe to same queue
    // Each message will be processed by only one worker
    for (let i = 0; i < 3; i++) {
      await this.subscriberService.subscribe(
        'background_tasks',
        async (message, ack, nack) => {
          try {
            console.log(`Worker ${i} processing task:`, message);
            await this.processTask(message);
            ack();
          } catch (error) {
            console.error(`Worker ${i} failed:`, error);
            nack(true); // Requeue for another worker
          }
        },
      );
    }
  }

  async enqueueTask(taskType: string, payload: any) {
    await this.publisherService.publishToQueue('background_tasks', {
      taskType,
      payload,
      enqueuedAt: new Date(),
      id: Math.random().toString(36).substr(2, 9),
    });
  }

  private async processTask(task: any) {
    console.log(`Processing ${task.taskType}:`, task.payload);

    switch (task.taskType) {
      case 'send_email':
        await this.sendEmail(task.payload);
        break;
      case 'generate_report':
        await this.generateReport(task.payload);
        break;
      case 'cleanup':
        await this.cleanup(task.payload);
        break;
      default:
        console.warn('Unknown task type:', task.taskType);
    }
  }

  private async sendEmail(payload: any) {
    console.log('Sending email to:', payload.email);
    // Email sending logic
  }

  private async generateReport(payload: any) {
    console.log('Generating report for:', payload.reportType);
    // Report generation logic
  }

  private async cleanup(payload: any) {
    console.log('Cleaning up:', payload.target);
    // Cleanup logic
  }
}

// EXAMPLE 4: BROADCAST NOTIFICATIONS
// ====================================

@Injectable()
export class BroadcastService implements OnModuleInit {
  constructor(
    private publisherService: PublisherService,
    private subscriberService: SubscriberService,
    private rabbitMQService: RabbitMQService,
  ) {}

  async onModuleInit() {
    await this.setupBroadcasting();
  }

  private async setupBroadcasting() {
    // Fanout exchange broadcasts to all interested parties
    await this.rabbitMQService.assertExchange('system_notifications', 'fanout');

    // Email service queue
    await this.rabbitMQService.assertQueue('notifications_email');
    await this.rabbitMQService.bindQueue(
      'notifications_email',
      'system_notifications',
      '',
    );

    // SMS service queue
    await this.rabbitMQService.assertQueue('notifications_sms');
    await this.rabbitMQService.bindQueue(
      'notifications_sms',
      'system_notifications',
      '',
    );

    // Push notification queue
    await this.rabbitMQService.assertQueue('notifications_push');
    await this.rabbitMQService.bindQueue(
      'notifications_push',
      'system_notifications',
      '',
    );

    // Email handler
    await this.subscriberService.subscribeToExchange(
      'system_notifications',
      'notifications_email',
      '',
      async (message, ack) => {
        console.log('Sending email:', message.title);
        ack();
      },
    );

    // SMS handler
    await this.subscriberService.subscribeToExchange(
      'system_notifications',
      'notifications_sms',
      '',
      async (message, ack) => {
        console.log('Sending SMS:', message.title);
        ack();
      },
    );

    // Push notification handler
    await this.subscriberService.subscribeToExchange(
      'system_notifications',
      'notifications_push',
      '',
      async (message, ack) => {
        console.log('Sending push notification:', message.title);
        ack();
      },
    );
  }

  async broadcast(title: string, message: string, metadata: any = {}) {
    // All subscribers receive this
    await this.publisherService.publishToExchange('system_notifications', '', {
      title,
      message,
      metadata,
      timestamp: new Date(),
    });
  }
}

// USAGE IN APP MODULE
// ====================

/*
import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { OrderProcessingService } from './services/order-processing.service';
import { LogAggregationService } from './services/log-aggregation.service';
import { BackgroundTaskService } from './services/background-task.service';
import { BroadcastService } from './services/broadcast.service';

@Module({
  imports: [RabbitMQModule],
  providers: [
    OrderProcessingService,
    LogAggregationService,
    BackgroundTaskService,
    BroadcastService,
  ],
  exports: [OrderProcessingService],
})
export class AppModule {}
*/

export {};
