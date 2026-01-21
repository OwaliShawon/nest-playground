import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import type { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(private readonly config: RabbitMQConfig) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      const url = `amqp://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.vhost}`;
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      this.logger.log('RabbitMQ connected successfully');
    } catch (error) {
      this.logger.error(`Failed to connect to RabbitMQ: ${error.message}`);
      throw error;
    }
  }

  private async disconnect() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.logger.log('RabbitMQ disconnected successfully');
    } catch (error) {
      this.logger.error(`Failed to disconnect from RabbitMQ: ${error.message}`);
    }
  }

  getConnection(): amqp.Connection {
    return this.connection;
  }

  getChannel(): amqp.Channel {
    return this.channel;
  }

  async assertExchange(exchange: string, type: 'direct' | 'fanout' | 'topic' | 'headers', durable = true) {
    try {
      await this.channel.assertExchange(exchange, type, { durable });
      this.logger.log(`Exchange '${exchange}' asserted`);
    } catch (error) {
      this.logger.error(`Failed to assert exchange '${exchange}': ${error.message}`);
      throw error;
    }
  }

  async assertQueue(queue: string, durable = true) {
    try {
      await this.channel.assertQueue(queue, { durable });
      this.logger.log(`Queue '${queue}' asserted`);
    } catch (error) {
      this.logger.error(`Failed to assert queue '${queue}': ${error.message}`);
      throw error;
    }
  }

  async bindQueue(queue: string, exchange: string, routingKey: string) {
    try {
      await this.channel.bindQueue(queue, exchange, routingKey);
      this.logger.log(`Queue '${queue}' bound to exchange '${exchange}' with routing key '${routingKey}'`);
    } catch (error) {
      this.logger.error(
        `Failed to bind queue '${queue}' to exchange '${exchange}': ${error.message}`,
      );
      throw error;
    }
  }
}
