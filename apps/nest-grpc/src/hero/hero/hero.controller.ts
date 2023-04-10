import {
  Controller,
  Inject,
  Logger,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod, Ctx } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { HeroById } from '../interface/hero/HeroById';
import { Hero } from '../interface/hero/Hero';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsersService } from 'src/users/users.service';
import { PhotoService } from 'src/photo/photo.service';
import { AllExceptionsFilter } from 'src/common/exception/allexception/allexception.filter';
import { TimestateInterceptor } from 'src/common/interceptor/timestate/timestate.interceptor';
import { UserException } from 'src/common/exception/UserException';
import { HeroCacheInterceptor } from './heroCacheInter';

@UseFilters(new AllExceptionsFilter())
@UseInterceptors(new TimestateInterceptor())
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

  @GrpcMethod('HeroesService', 'FindOne')
  // @UseInterceptors(CacheInterceptor)
  // @CacheKey('cachekey')
  @UseInterceptors(HeroCacheInterceptor)
  @CacheTTL(10) // 缓存时间，单位秒
  async FindOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<HeroById, { id: number }>,
  ): Promise<Hero> {
    this.logger.log('请求meta', metadata.toJSON());
    this.logger.log('请求path:', call.getPath());
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    const f = items.find(({ id }) => id === data.id);

    await this.cacheManager.set('grpckey', 'value', {
      ttl: 500000,
    });

    // user库中读取数据
    const info = await this.userService.findOne(2);
    this.logger.log('用户信息', info);

    // photo库中读取数据
    const list = await this.photoService.findAll();
    this.logger.log('图片列表', list);

    // 设置一个故意的错误。
    // const x = null as any;
    // x.forEach((element) => {
    //   console.log(element);
    // });

    // 抛出自定义错误
    // throw new UserException(100, 'Invalid credentials.');

    return f || {};
  }
}
