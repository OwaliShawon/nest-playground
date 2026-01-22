import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { REDIS_CLIENT } from 'src/core/redis/redis.provider';

@Injectable()
export class RedisPubSubService implements OnModuleDestroy {
  private subscribers: Map<string, RedisClientType> = new Map();

  constructor(@Inject(REDIS_CLIENT) private readonly client: RedisClientType) {}

  /**
   * Subscribe to a channel
   */
  async subscribe(
    channel: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();

    await subscriber.subscribe(channel, (message, channelName) => {
      callback(message, channelName);
    });

    this.subscribers.set(`sub:${channel}`, subscriber);
  }

  /**
   * Subscribe to channels matching a pattern
   */
  async pSubscribe(
    pattern: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();

    await subscriber.pSubscribe(pattern, (message, channelName) => {
      callback(message, channelName);
    });

    this.subscribers.set(`psub:${pattern}`, subscriber);
  }

  /**
   * Unsubscribe from a channel
   */
  async unsubscribe(channel: string): Promise<void> {
    const key = `sub:${channel}`;
    const subscriber = this.subscribers.get(key);

    if (subscriber) {
      await subscriber.unsubscribe(channel);
      await subscriber.quit();
      this.subscribers.delete(key);
    }
  }

  /**
   * Unsubscribe from a pattern
   */
  async pUnsubscribe(pattern: string): Promise<void> {
    const key = `psub:${pattern}`;
    const subscriber = this.subscribers.get(key);

    if (subscriber) {
      await subscriber.pUnsubscribe(pattern);
      await subscriber.quit();
      this.subscribers.delete(key);
    }
  }

  /**
   * Cleanup all subscribers on module destroy
   */
  async onModuleDestroy() {
    for (const [key, subscriber] of this.subscribers) {
      try {
        await subscriber.quit();
      } catch (error) {
        console.error(`Error closing subscriber ${key}:`, error);
      }
    }
    this.subscribers.clear();
  }

  /**
   * Get all active subscriptions
   */
  getActiveSubscriptions(): string[] {
    return Array.from(this.subscribers.keys());
  }
}
