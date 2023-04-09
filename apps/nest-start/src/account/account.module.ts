import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { BookModule } from 'src/book/book.module';
import { Logger2Middleware } from './logger2/logger2.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BookModule,
    CacheModule.register<RedisClientOptions>({
      // isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 0,
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger2Middleware).forRoutes({
      path: 'account*',
      method: RequestMethod.GET,
    });
  }
}
