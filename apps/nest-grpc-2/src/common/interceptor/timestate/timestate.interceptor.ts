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
    const [, , call] = context.getArgs();
    const path = call.getPath();
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => this.logger.log(` ${path} ${Date.now() - now}ms`)));
  }
}
