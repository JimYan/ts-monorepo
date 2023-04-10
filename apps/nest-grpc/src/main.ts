import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3002',
        package: 'hero',
        protoPath: join(__dirname, 'hero/proto/hero.proto'),
      },
    },
  );

  // await app.startAllMicroservices();
  await app.listen();
  console.log(`Application is running on: `);
}
bootstrap();
