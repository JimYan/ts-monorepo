import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';

// import { AppService } from './app.service';
// import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

// import { PrismaService } from './prisma.service';
// import { ScheduleModule } from '@nestjs/schedule';
// import { TaskService } from './task/task.service';
import { HeroModule } from './hero/hero.module';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photo/photo.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    // ScheduleModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
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
  providers: [],
  exports: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer.apply(LoggerMiddleware).forRoutes('/');
  // }
}
