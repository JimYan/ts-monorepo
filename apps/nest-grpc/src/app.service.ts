import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  @Inject(CACHE_MANAGER)
  private readonly cacheService: Cache;

  getHello(): string {
    return 'Hello World!';
  }

  async setCache(key, value, ttl = 0): Promise<string> {
    await this.cacheService.set(key, value, { ttl });
    return 'ok';
  }
}
