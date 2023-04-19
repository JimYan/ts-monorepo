import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { M1Module } from '@nighttrax/proto/handle/M1Module';

// import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './account/account.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 1,
    }),
    M1Module.forRoot(),
    AccountModule,
  ],
  controllers: [],
  providers: [],
  exports: [CacheModule],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes('/');
  // }
}
