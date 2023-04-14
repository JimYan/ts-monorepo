import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const uri = '0.0.0.0:3003';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: uri,
        package: 'mwp.m2',
        protoPath: join(
          __dirname,
          '../node_modules/@nighttrax/proto/proto/mwp/m2/mwp_m2_account.proto',
        ),
      },
    },
  );

  // await app.startAllMicroservices();
  await app.listen();
  console.log(`Application is running on: ${uri}`);
}
bootstrap();
