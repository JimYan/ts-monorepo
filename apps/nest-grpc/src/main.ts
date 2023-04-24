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
        package: 'mwp.m1',
        protoPath: join(
          __dirname,
          '../node_modules/@nighttrax/proto/proto/mwp/m1/mwp_m1_main.proto',
        ),
      },
    },
  );

  // await app.startAllMicroservices();
  await app.listen();
  console.log(`Application is running on: 0.0.0.0:3002`);
}
bootstrap();
