import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HeroCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    // console.log(context);
    const [args, meta, call] = context.getArgs();
    const path = call.getPath();

    if (path === '/hero.HeroesService/FindOne') return `${path}/${args.id}`;
    else {
      return ''; // 返回空，不缓存
    }
  }
}
