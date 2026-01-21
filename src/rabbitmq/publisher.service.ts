import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class PublisherService {
  private readonly logger = new Logger(PublisherService.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publishToExchange(
    exchange: string,
    routingKey: string,
    message: any,
    options?: { persistent?: boolean },
  ): Promise<boolean> {
    try {
      const channel = this.rabbitMQService.getChannel();
      const messageBuffer = Buffer.from(JSON.stringify(message));

      const published = channel.publish(exchange, routingKey, messageBuffer, {
        contentType: 'application/json',
        persistent: options?.persistent ?? true,
      });

      if (published) {
        this.logger.log(
          `Message published to exchange '${exchange}' with routing key '${routingKey}'`,
        );
      } else {
        this.logger.warn(
          `Failed to publish message to exchange '${exchange}'. Channel buffer full.`,
        );
      }

      return published;
    } catch (error) {
      this.logger.error(
        `Error publishing message to exchange '${exchange}': ${error.message}`,
      );
      throw error;
    }
  }

  async publishToQueue(queue: string, message: any, options?: { persistent?: boolean }): Promise<boolean> {
    try {
      const channel = this.rabbitMQService.getChannel();
      const messageBuffer = Buffer.from(JSON.stringify(message));

      const published = channel.sendToQueue(queue, messageBuffer, {
        contentType: 'application/json',
        persistent: options?.persistent ?? true,
      });

      if (published) {
        this.logger.log(`Message published to queue '${queue}'`);
      } else {
        this.logger.warn(`Failed to publish message to queue '${queue}'. Channel buffer full.`);
      }

      return published;
    } catch (error) {
      this.logger.error(`Error publishing message to queue '${queue}': ${error.message}`);
      throw error;
    }
  }
}
