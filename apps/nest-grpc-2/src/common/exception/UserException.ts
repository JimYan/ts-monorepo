import { RpcException } from '@nestjs/microservices';

// 自定义错误.
export class UserException extends RpcException {
  constructor(errcode: number, errmsg: string) {
    // super(errmsg);
    super({ code: errcode, msg: errmsg });
  }
}
