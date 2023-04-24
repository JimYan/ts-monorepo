import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { ConfigModule } from '@nestjs/config';

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
    }),
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
