import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { BookService } from './book/book.service';
import { CatsService } from 'src/cats/cats.service';

@Module({
  controllers: [BookController, OrderController],
  providers: [OrderService, BookService, CatsService],
  exports: [BookService],
})
export class BookModule {}
