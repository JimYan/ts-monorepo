import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { HeroModule } from './hero/hero.module';
import { M1Module } from '@nighttrax/proto/handle/M1Module';
import { M2Module } from '@nighttrax/proto/handle/M2Module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AccountModule,
    CacheModule.register<RedisClientOptions>({
      // isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 1,
    }),
    HeroModule,
    M1Module.forRoot(
      process.env.NODE_ENV == 'prod'
        ? 'mwp-rpc-ghri5ivvvq-df.a.run.app:443'
        : // : 'mwp-rpc-ghri5ivvvq-df.a.run.app:443',
          '127.0.0.1:3002',
    ),
    M2Module.forRoot('127.0.0.1:3003'),
    M1Module.forRoot(
      process.env.NODE_ENV == 'prod'
        ? 'mwp-grpc-2-ghri5ivvvq-df.a.run.app:443'
        : // : 'mwp-rpc-ghri5ivvvq-df.a.run.app:443',
          '127.0.0.1:3003',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
