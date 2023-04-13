import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { UserException } from '../UserException';
import { of } from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  private readonly logger = new Logger('ExceptionError');

  catch(exception: RpcException, host: ArgumentsHost) {
    const [param, meta, call] = host.getArgs();

    const log =
      exception instanceof UserException ? this.logger.warn : this.logger.error;
    log.apply(this.logger, ['request param', JSON.stringify(param)]);
    log.apply(this.logger, ['request meta', JSON.stringify(meta.getMap())]);
    log.apply(this.logger, ['request path', call.getPath()]);
    log.apply(this.logger, ['error msg', JSON.stringify(exception)]);
    log.apply(this.logger, ['error stack', exception.stack]);

    let code = (exception as any).getStatus
      ? (exception as any).getStatus()
      : 500;
    let msg = 'system error';
    // (exception as any).getStatus();
    if (typeof exception.getError == 'function') {
      const error = exception.getError() as {
        code: number;
        msg: string;
      };
      code = error.code;
      msg = error.msg;
    }
    return of({ code, msg: msg }); // todo 修改为正常的值.
  }
}
