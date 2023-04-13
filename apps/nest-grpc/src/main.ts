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
        package: 'wp.m1',
        protoPath: join(
          __dirname,
          '../node_modules/@nighttrax/proto/proto/wp/m1/wp_m1_main.proto',
        ),
      },
    },
  );

  // await app.startAllMicroservices();
  await app.listen();
  console.log(`Application is running on: `);
}
bootstrap();
