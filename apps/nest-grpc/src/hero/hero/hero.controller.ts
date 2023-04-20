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

import { FindOneReq } from '@nighttrax/proto/interface/mwp/m1/FindOneReq';
import { FindOneResp } from '@nighttrax/proto/interface/mwp/m1/FindOneResp';

import { FindManyReq } from '@nighttrax/proto/interface/mwp/m1/FindManyReq';
import { FindManyResp } from '@nighttrax/proto/interface/mwp/m1/FindManyResp';

import {
  CACHE_MANAGER,
  CacheTTL,
  CacheInterceptor,
  CacheKey,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsersService } from 'src/dao/users/users.service';
import { PhotoService } from 'src/dao/photo/photo.service';
import { AllExceptionsFilter } from 'src/common/exception/allexception/allexception.filter';
import { TimestateInterceptor } from 'src/common/interceptor/timestate/timestate.interceptor';
import { UserException } from 'src/common/exception/UserException';
import { HeroCacheInterceptor } from './heroCacheInter';

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
export class HeroController {
  private readonly logger = new Logger('HeroesService');

  @Inject(UsersService)
  private readonly userService: UsersService;

  @Inject(PhotoService)
  private readonly photoService: PhotoService;

  @Inject(CACHE_MANAGER)
  private readonly cacheManager: Cache;

  @GrpcMethod('HeroesService', 'FindMany')
  async findMany(data: FindManyReq): Promise<FindManyResp> {
    // data.type.
    this.logger.log(data);
    return {
      code: 0,
      msg: '',
      list: [
        {
          id: 1,
          name: 'n1',
        },
        {
          id: 2,
          name: 'n2',
        },
      ],
    };
  }

  @GrpcMethod('HeroesService', 'FindOne')
  @UseInterceptors(CacheInterceptor) //如果是一个可以写死的key，那么可以用官方的缓存管道。
  @CacheKey('cachekey') // 自定义key
  // @UseInterceptors(HeroCacheInterceptor)
  @CacheTTL(10) // 缓存时间，单位秒
  async FindOne(
    data: FindOneReq,
    metadata: Metadata,
    call: ServerUnaryCall<FindOneReq, { id: number }>,
  ): Promise<FindOneResp> {
    this.logger.log('请求meta', metadata.toJSON());
    this.logger.log('请求path:', call.getPath());
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    const resp = items.find(({ id }) => id === data.id);

    await this.cacheManager.set('grpckey', 'valuev2', {
      ttl: 500000,
    });

    // user库中读取数据
    const info = await this.userService.findOne(2);
    this.logger.log('用户信息', info);

    // photo库中读取数据
    const list = await this.photoService.findAll();
    this.logger.log('图片列表', list);

    // // 设置一个故意的错误。
    // const x = null as any;
    // x.forEach((element) => {
    //   console.log(element);
    // });

    // 抛出自定义错误
    // throw new UserException(100100100, 'Invalid credentials.');

    return (
      {
        code: 0,
        msg: '',
        hero: resp,
      } || {}
    );
  }
}
