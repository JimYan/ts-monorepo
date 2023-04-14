import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

// import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

import { ScheduleModule } from '@nestjs/schedule';
import { HeroModule } from './hero/hero.module';
import { UsersModule } from './dao/users/users.module';
import { PhotoModule } from './dao/photo/photo.module';
import { AppService } from './app/app.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      // isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 1,
    }),
    HeroModule,
    UsersModule,
    PhotoModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes('/');
  // }
}
