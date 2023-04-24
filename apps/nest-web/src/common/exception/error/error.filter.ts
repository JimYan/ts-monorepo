import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 取得上下文
    const ctx = host.switchToHttp();
    // 响应控制权
    const response = ctx.getResponse<Response>();
    // 请求对象
    const request = ctx.getRequest<Request>();
    // 异常状态码
    const status = exception.getStatus();

    const expResp = exception.getResponse();
    // console.log('errr.');
    console.log(exception);
    response
      // 响应状态
      .status(HttpStatus.OK)
      .json({
        code: -1,
        status,
        msg: '服务器异常',
      });
    // .json(exception.getResponse());
  }
}
