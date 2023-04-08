import { HttpException, HttpStatus } from '@nestjs/common';

// 自定义错误.
export class UserException extends HttpException {
  constructor(errcode: number, errmsg: string) {
    super({ code: errcode, msg: errmsg }, HttpStatus.OK);
  }
}
