import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    // .pipe(
    //   map((data) => {
    //     return {
    //       id: 100,
    //       name: 'xx',
    //     };
    //     return {
    //       code: 0,
    //       message: '',
    //       timestamp: new Date(),
    //       data,
    //     };
    //   }),
    // );
  }
}
