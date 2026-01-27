import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceMasterModule } from './invoice_master/invoice_master.module';
import { InvoiceDetailsModule } from './invoice_details/invoice_details.module';
import { RedisModule } from './redis/redis.module';
import { CoreRedisModule } from './core/redis/redis.module';
import { RabbitMQExampleModule } from './rabbitmq/rabbitmq.example.module';
import z from 'zod';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';
import { TasksModule } from './tasks/tasks.module';
// import { CacheableMemory } from 'cacheable';
import { AlsModule } from './als/als.module';
import { AsyncLocalStorage } from 'node:async_hooks';
import { CatsModule } from './cats/cats.module';
import { ClsModule } from './core/cls/cls.module';
import { ContextMiddleware } from './core/cls/cls.middleware';
import { ContextService } from './core/cls/cls.service';
import { DddExampleModule } from './ddd-example/ddd-example.module';
import { CqrsExampleModule } from './cqrs-example/cqrs-example.module';

@Module({
  imports: [
    // ENV
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (config) =>
        z
          .object({
            NODE_ENV: z
              .enum(['development', 'production', 'test', 'provision'])
              .default('development'),
            PORT: z.coerce.number().default(3000),
            DB_HOST: z.string(),
            DB_PORT: z.coerce.number(),
            DB_USERNAME: z.string(),
            DB_PASSWORD: z.string(),
            DB_NAME: z.string(),
          })
          .parse(config),
    }),

    // CLS Module - for request context tracking
    ClsModule,

    // DATABASE
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),

    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              // store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            new KeyvRedis('redis://localhost:6379'),
          ],
        };
      },
    }),
    ProductsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    InvoiceMasterModule,
    InvoiceDetailsModule,
    RedisModule,
    CoreRedisModule,
    RabbitMQExampleModule,
    // TasksModule,
    AlsModule,
    CatsModule,
    DddExampleModule,
    CqrsExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    // inject the AsyncLocalStorage in the module constructor,
    private readonly als: AsyncLocalStorage<any>,
    private readonly contextService: ContextService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // Apply CLS context middleware
    consumer.apply(ContextMiddleware).forRoutes('*path');

    // bind the old middleware,
    consumer
      .apply((req: any, res: any, next: any) => {
        // populate the store with some default values
        // based on the request,
        const store = {
          userId: req.headers['x-user-id'],
        };
        // and pass the "next" function as callback
        // to the "als.run" method together with the store.
        this.als.run(store, () => next());
      })
      .forRoutes('*path');
  }
}
