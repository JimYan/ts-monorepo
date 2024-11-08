import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      // isGlobal: true,
      // store: redisStore,
      // host: process.env.redisHost,
      // port: process.env.redisPort,
      // password: process.env.redisPassword,
      // db: 0,
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
