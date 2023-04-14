import {
  Controller,
  Inject,
  Logger,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { FindAccountReq } from '@nighttrax/proto/interface/mwp/m2/FindAccountReq';
import { FindAccountResp } from '@nighttrax/proto/interface/mwp/m2/FindAccountResp';
import { AccountBo } from '@nighttrax/proto/interface/mwp/m2/AccountBo';

import {
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AllExceptionsFilter } from 'src/common/exception/allexception/allexception.filter';
import { TimestateInterceptor } from 'src/common/interceptor/timestate/timestate.interceptor';
import { UserException } from 'src/common/exception/UserException';

import { M1Service } from '@nighttrax/proto/handle/M1Service';
import { BookServiceClientStub } from '@nighttrax/proto/interface/mwp/m1/BookServiceClientStub';
// import { HeroCacheInterceptor } from './heroCacheInter';

console.log(CACHE_MANAGER);

@UseFilters(new AllExceptionsFilter()) // handle所有的错误.
@UseInterceptors(new TimestateInterceptor()) // 每个service的执行时间。
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidUnknownValues: false,
    // disableErrorMessages: true,
  }),
)
@Controller()
export class AccountController {
  private readonly logger = new Logger('AccountService');

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Inject(M1Service)
  private readonly m1Service: M1Service;

  @Inject(BookServiceClientStub)
  private readonly BookServiceClientStub: BookServiceClientStub;

  @GrpcMethod('AccountService', 'FindAccount')
  @UseInterceptors(CacheInterceptor) //如果是一个可以写死的key，那么可以用官方的缓存管道。
  // @CacheKey('cachekey') // 自定义key
  // @UseInterceptors(HeroCacheInterceptor)
  @CacheTTL(10) // 缓存时间，单位秒
  async FindOne(
    data: FindAccountReq,
    metadata: Metadata,
    call: ServerUnaryCall<FindAccountReq, any>,
  ): Promise<FindAccountResp> {
    this.logger.log('请求meta', metadata.toJSON());
    this.logger.log('请求path:', call.getPath());

    // const book = await this.m1Service.bookServiceClient
    //   .FindBook({
    //     source: 'nest-grpc-2',
    //     id: 1,
    //   })
    //   .toPromise();
    const book = await this.BookServiceClientStub.stub
      .FindBook({
        source: 'af',
        id: 1,
      })
      .toPromise();
    this.logger.log('bookinfo', book);

    // const hero = await this.m1Service.heroesServiceClient
    //   .FindOne({
    //     source: 'herocontroller',
    //     id: 1,
    //   })
    //   .toPromise();
    // this.logger.log('hero', hero);

    const items: AccountBo[] = [
      {
        id: 1,
        username: 'John@gmail.com',
        nickname: 'John',
        photo: '/path/to/img',
      },
      {
        id: 2,
        username: 'Nina@gmail.com',
        nickname: 'Nina',
        photo: '/path/to/Nina',
      },
    ];
    const resp = items.find(({ id }) => id === data.id);

    this.cacheManager.set('testgrpckey', 'value', {
      ttl: 5000,
    });

    return (
      {
        code: 0,
        msg: '',
        list: [resp],
      } || {}
    );
  }
}
