import { Provider } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: async (): Promise<RedisClientType> => {
    const client: RedisClientType = createClient({
      url: 'redis://localhost:6379',
    });

    client.on('error', (err) => console.error('Redis error', err));

    await client.connect();
    return client;
  },
};
