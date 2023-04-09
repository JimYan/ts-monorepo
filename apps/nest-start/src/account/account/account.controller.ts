import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { BookService } from 'src/book/book/book.service';
import { UserException } from 'src/common/exception/UserException';
import { queryDto } from './account.dot';
import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';

@Controller('account')
export class AccountController {
  @Inject(AccountService)
  private readonly accountService: AccountService;

  @Inject(BookService)
  private readonly bookService: BookService;

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;

  @Get()
  index() {
    return 'index';
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('/info')
  async getInfo(@Query() query: queryDto) {
    // await this.cacheManager.set('key', 'value', { ttl: 500 });
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
      time: new Date().toISOString(),
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
