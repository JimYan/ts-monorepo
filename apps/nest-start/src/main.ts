import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/exception/error/error.filter';
import { AllexceptionFilter } from './common/exception/allexception/allexception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptorInterceptor } from './common/interceptor/transform-interceptor/transform-interceptor.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllexceptionFilter());
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: false,

      // disableErrorMessages: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptorInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
