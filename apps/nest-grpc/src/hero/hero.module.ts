import { Module } from '@nestjs/common';
import { HeroController } from './hero/hero.controller';
import { UsersModule } from 'src/dao/users/users.module';
import { PhotoModule } from 'src/dao/photo/photo.module';
import { BookController } from './book/book.controller';
import { TaskService } from './task/task.service';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    UsersModule,
    PhotoModule,
    CacheModule.register<RedisClientOptions>({
      // isGlobal: true,
      store: redisStore,
      host: process.env.redisHost,
      port: process.env.redisPort,
      password: process.env.redisPassword,
      db: 0,
    }),
  ],
  controllers: [HeroController, BookController],
  providers: [TaskService],
})
export class HeroModule {}
