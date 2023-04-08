import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { BookModule } from './book/book.module';
import { AccountModule } from './account/account.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

const cache = CacheModule.register({
  isGlobal: true,
});
@Module({
  imports: [BookModule, AccountModule, cache],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
