import { Controller, Get, Inject } from '@nestjs/common';
import { BookService } from './book.service';
import { CatsService } from 'src/cats/cats.service';

@Controller('book')
export class BookController {
  @Inject(BookService)
  private readonly bookService: BookService;

  @Inject(CatsService)
  private readonly catsService: CatsService;

  @Get('/list')
  async getList() {
    return {
      a: await this.bookService.getList(),
      b: this.catsService.getHello(),
    };
  }
}
