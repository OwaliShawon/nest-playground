import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { RedisPubSubService } from './redis-pubsub.service';

@Module({
  providers: [RedisService, RedisPubSubService],
  exports: [RedisService, RedisPubSubService],
  controllers: [RedisController],
})
export class RedisModule {}
