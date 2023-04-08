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
  // @CacheKey('custom_key2')
  // @CacheTTL(1)
  async getHello() {
    await this.cacheManager.set('key', 'value', 5000);
    // const value = await this.cacheManager.get('key');
    // console.log(value);
    return this.appService.getHello();
  }

  @Get('/cache')
  // @CacheKey('custom_key2')
  // @CacheTTL(1)
  async getCache() {
    // await this.cacheManager.set('key', 'value');
    const cacheData = await this.cacheManager.get('key');
    console.log(cacheData);

    // this.cacheManager.wrap
    return { cacheData };
  }
}
