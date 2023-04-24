/* eslint-disable @typescript-eslint/ban-types */
import {
  Controller,
  Get,
  Inject,
  Query,
  Param,
  UseInterceptors,
  Logger,
  Body,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UserException } from 'src/common/exception/UserException';
import { ApiResponse, pageDto } from 'src/common/Decorator';
import {
  queryDto,
  userDto,
  helloDataDto,
  queryAccountDto,
  AllAccountDto,
} from './account.dto';
import { BookBoDto } from '@nighttrax/proto/interface/mwp/m1/BookBo';
import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('account')
@ApiTags('Account')
export class AccountController {
  private readonly logger = new Logger('AccountController');

  @Inject(AccountService)
  private readonly accountService: AccountService;

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;

  @Get()
  @ApiResponse('class', BookBoDto)
  index2(@Query() query: queryAccountDto) {
    console.log(query);
    return 'indess';
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('/info')
  @ApiResponse('page', userDto)
  // @ApiPageResponse(userDto)
  async getInfo(@Query() query: queryDto): Promise<pageDto<userDto>> {
    this.logger.debug('info...');
    this.logger.log('info...');
    this.logger.warn('info...');
    this.logger.error('error...');
    // type x = AccountService.getInfo.

    return {
      pageCount: 0,
      pageIndex: 1,
      perpage: 10,
      list: [
        {
          email: 'j@qq.com',
          uid: 1,
          name: 'j',
        },
      ],
      // account: await this.accountService.getInfo(
      //   {
      //     id: query.id,
      //     email: 'asd@qq.com',
      //   },
      //   {
      //     p1: 'p1v',
      //     p2: 2,
      //   },
      // ),
      // time: new Date().toISOString(),
    };
  }

  @Get('/error')
  errorDemo() {
    throw new UserException(40010, '异常');
  }

  @Get('/all')
  async all(): Promise<{ a: number; b: string }> {
    return Promise.resolve({
      a: 1,
      b: '2',
    });
  }

  @Get('/error2')
  // @ApiExtraModels(baseParamResponse)
  @ApiResponse('string')
  error2() {
    // const a = null as any;
    // a.forEach((element) => {
    //   console.log(element + 1);
    // });
    return 'asdf';
  }

  @Get('/allAccount')
  @ApiResponse('class', AllAccountDto)
  async allAccount(@Query() query: queryAccountDto) {
    return new Promise((reslove) => {
      setTimeout(function () {
        reslove({ info: query.name });
      }, 1000);
    });
  }

  @Post('/update')
  @ApiResponse('class', AllAccountDto)
  async updateUser(@Body() body: queryAccountDto) {
    return new Promise((reslove) => {
      setTimeout(function () {
        reslove({ info: body.name });
      }, 1000);
    });
  }
}
