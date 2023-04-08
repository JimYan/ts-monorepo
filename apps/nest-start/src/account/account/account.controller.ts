import {
  Controller,
  Get,
  Inject,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { BookService } from 'src/book/book/book.service';
import { UserException } from 'src/common/exception/UserException';
import { queryDto } from './account.dot';

@Controller('account')
export class AccountController {
  @Inject(AccountService)
  private readonly accountService: AccountService;

  @Inject(BookService)
  private readonly bookService: BookService;

  @Get()
  index() {
    return 'index';
  }

  @Get('/info')
  async getInfo(@Query() query: queryDto) {
    // console.log(query);
    return {
      account: await this.accountService.getInfo(
        {
          id: query.id,
          email: 'asd@qq.com',
        },
        {
          p1: 'p1v',
          p2: 2,
        },
      ),
      book: await this.bookService.getList(),
    };
  }

  @Get('/error')
  errorDemo() {
    throw new UserException(40010, '异常');
  }

  @Get('/error2')
  error2() {
    const a = null as any;
    a.forEach((element) => {
      console.log(element + 1);
    });
    return 'asdf';
  }
}
