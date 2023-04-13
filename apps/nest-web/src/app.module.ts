import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { BookModule } from './book/book.module';
import { AccountModule } from './account/account.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { HeroModule } from './hero/hero.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BookModule,
    AccountModule,
    CacheModule.register<RedisClientOptions>({
      // isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 1,
    }),
    UsersModule,
    HeroModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, PrismaService, TaskService],
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
