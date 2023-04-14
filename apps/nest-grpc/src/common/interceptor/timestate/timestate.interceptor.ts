import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimestateInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TimeState');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [data, , call] = context.getArgs();
    const path = call.getPath();
    const now = Date.now();
    this.logger.log('path', path);
    this.logger.log('req data', data);
    return next
      .handle()
      .pipe(tap(() => this.logger.log(` ${path} ${Date.now() - now}ms`)));
  }
}
