import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

export type MessageHandler = (
  message: any,
  ack: () => void,
  nack: (requeue?: boolean) => void,
) => Promise<void>;

@Injectable()
export class SubscriberService {
  private readonly logger = new Logger(SubscriberService.name);
  private handlers: Map<string, MessageHandler[]> = new Map();

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async subscribe(
    queue: string,
    handler: MessageHandler,
    prefetch = 1,
  ): Promise<void> {
    try {
      const channel = this.rabbitMQService.getChannel();
      await channel.prefetch(prefetch);

      // Store handler for potential reuse
      if (!this.handlers.has(queue)) {
        this.handlers.set(queue, []);
      }
      this.handlers.get(queue).push(handler);

      await channel.consume(queue, async (msg) => {
        if (!msg) return;

        const ack = () => channel.ack(msg);
        const nack = (requeue = false) => channel.nack(msg, false, requeue);

        try {
          const content = JSON.parse(msg.content.toString());
          this.logger.log(`Message received from queue '${queue}'`);
          await handler(content, ack, nack);
        } catch (error) {
          this.logger.error(
            `Error processing message from queue '${queue}': ${error.message}`,
          );
          nack(true); // Requeue on error
        }
      });

      this.logger.log(`Subscribed to queue '${queue}'`);
    } catch (error) {
      this.logger.error(
        `Error subscribing to queue '${queue}': ${error.message}`,
      );
      throw error;
    }
  }

  async subscribeToExchange(
    exchange: string,
    queue: string,
    routingKey: string,
    handler: MessageHandler,
    prefetch = 1,
  ): Promise<void> {
    try {
      const channel = this.rabbitMQService.getChannel();
      await channel.prefetch(prefetch);

      // Store handler for potential reuse
      if (!this.handlers.has(queue)) {
        this.handlers.set(queue, []);
      }
      this.handlers.get(queue).push(handler);

      await channel.consume(queue, async (msg) => {
        if (!msg) return;

        const ack = () => channel.ack(msg);
        const nack = (requeue = false) => channel.nack(msg, false, requeue);

        try {
          const content = JSON.parse(msg.content.toString());
          this.logger.log(
            `Message received from queue '${queue}' on exchange '${exchange}' with routing key '${routingKey}'`,
          );
          await handler(content, ack, nack);
        } catch (error) {
          this.logger.error(
            `Error processing message from queue '${queue}': ${error.message}`,
          );
          nack(true); // Requeue on error
        }
      });

      this.logger.log(
        `Subscribed to exchange '${exchange}' with routing key '${routingKey}' on queue '${queue}'`,
      );
    } catch (error) {
      this.logger.error(
        `Error subscribing to exchange '${exchange}': ${error.message}`,
      );
      throw error;
    }
  }

  getHandlers(queue: string): MessageHandler[] {
    return this.handlers.get(queue) || [];
  }
}
