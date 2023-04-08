import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { BookModule } from 'src/book/book.module';
import { Logger2Middleware } from './logger2/logger2.middleware';

@Module({
  imports: [BookModule],
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
