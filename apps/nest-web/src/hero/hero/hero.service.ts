import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { m1 } from 'src/common/GrpcRegister';
import { HeroesServiceClient } from '@nighttrax/proto/interface/wp/m1/HeroesService';
// import { FindOneReq } from '@nighttrax/proto/interface/wp/m1/FindOneReq';
import { FindOneResp } from '@nighttrax/proto/interface/wp/m1/FindOneResp';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class HeroService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    ...m1,
  })
  client: ClientGrpc;

  // @Inject('HERO_PACKAGE') private readonly client: ClientGrpc;

  public heroesService: HeroesServiceClient;

  onModuleInit() {
    this.heroesService = this.client.getService('HeroesService');
  }

  getHero(): Promise<FindOneResp> {
    const meta = new Metadata();
    meta.add('tid', 'tidvalue...');
    const info = this.heroesService
      .FindOne({ source: 'asdf', id: 2 }, meta)
      .toPromise();
    return info;
  }
}
