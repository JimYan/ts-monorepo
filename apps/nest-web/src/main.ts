import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/exception/error/error.filter';
import { AllexceptionFilter } from './common/exception/allexception/allexception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptorInterceptor } from './common/interceptor/transform-interceptor/transform-interceptor.interceptor';
import { swaggerInit } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //自定义异常处理拦截器
  app.useGlobalFilters(new AllexceptionFilter());
  app.useGlobalFilters(new ErrorFilter());

  // 设置全局的参数验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: false,
      // disableErrorMessages: true,
    }),
  );

  app.enableCors();

  // 包装全局返回内容
  app.useGlobalInterceptors(new TransformInterceptorInterceptor());

  Logger.log(`process.env.NODE_ENV: ${JSON.stringify(process.env)}`);
  console.log(process.env);
  if (process.env.NODE_ENV === 'dev') {
    swaggerInit(app);
  }

  Logger.log(`app start at port 3001`);
  await app.listen(3001);
}
bootstrap();
