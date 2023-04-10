import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroController } from './hero/hero.controller';
import { HeroService } from './hero/hero.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          url: '127.0.0.1:3002',
          protoPath: join(__dirname, '../proto/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
