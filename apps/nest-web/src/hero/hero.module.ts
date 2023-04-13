import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HeroController } from './hero/hero.controller';
import { HeroService } from './hero/hero.service';
import { m1 } from '../common/GrpcRegister';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'HERO_PACKAGE',
    //     transport: Transport.GRPC,
    //     ...m1,
    //   },
    // ]),
  ],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
