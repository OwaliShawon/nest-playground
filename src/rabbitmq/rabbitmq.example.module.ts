import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq.module';
import { ExampleController } from './example.controller';

@Module({
  imports: [RabbitMQModule],
  controllers: [ExampleController],
})
export class RabbitMQExampleModule {}
