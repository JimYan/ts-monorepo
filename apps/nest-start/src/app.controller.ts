import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import {
  CACHE_MANAGER,
  CacheKey,
  CacheTTL,
  CacheInterceptor,
} from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/ccache')
  @CacheKey('setkey')
  @CacheTTL(5000)
  @UseInterceptors(CacheInterceptor)
  testCacheController() {
    return { time: new Date().toISOString() };
  }

  @Get()
  async getHello() {
    await this.cacheManager.set('keyasdf', 'valueasdf', { ttl: 5000 });
    return this.appService.getHello();
  }

  @Get('/cache')
  async getCache() {
    const cacheData = await this.cacheManager.get('keyasdf');
    console.log(cacheData);

    await this.appService.setCache('k2', 'v2');
    return { cacheData };
  }
}
