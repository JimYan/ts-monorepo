import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const uri = '0.0.0.0:3004';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: uri,
        package: 'mwp.demo',
        protoPath: join(
          __dirname,
          '../node_modules/@nighttrax/proto/proto/mwp/demo/mwp_demo_main.proto',
        ),
      },
    },
  );

  // await app.startAllMicroservices();
  await app.listen();
  console.log(`Application is running on: ${uri}`);
}
bootstrap();
