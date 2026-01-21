import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';
import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';
import { DEFAULT_RABBITMQ_CONFIG } from './rabbitmq.config';

@Module({
  providers: [
    {
      provide: 'RABBITMQ_CONFIG',
      useFactory: () => DEFAULT_RABBITMQ_CONFIG,
    },
    {
      provide: RabbitMQService,
      inject: ['RABBITMQ_CONFIG'],
      useFactory: (config) => new RabbitMQService(config),
    },
    PublisherService,
    SubscriberService,
  ],
  exports: [RabbitMQService, PublisherService, SubscriberService],
})
export class RabbitMQModule {}
