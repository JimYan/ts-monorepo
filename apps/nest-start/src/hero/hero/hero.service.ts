import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroesServiceClient } from '../../proto/interface/hero/HeroesService';
import { Hero__Output } from '../../proto/interface/hero/Hero';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HeroById } from 'src/proto/interface/hero/HeroById';
import { Hero } from '../../proto/interface/hero/Hero';

interface IHeroService {
  FindOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}

@Injectable()
export class HeroService implements OnModuleInit {
  //   @Client({
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'hero',
  //       url: '127.0.0.1:3002',
  //       protoPath: join(__dirname, '../../proto/hero.proto'),
  //     },
  //   })
  //   client: ClientGrpc;

  @Inject('HERO_PACKAGE') private readonly client: ClientGrpc;

  private heroesService: IHeroService;

  onModuleInit() {
    this.heroesService = this.client.getService<IHeroService>('HeroesService');
  }

  getHero(): Promise<Hero> {
    // return new Promise();
    console.log(this.heroesService);
    const info = this.heroesService.FindOne({ id: 2 }).toPromise();
    // info.pipe()
    return info;
    // return new Promise((reslove, reject) => {
    //   this.heroesService.FindOne(
    //     {
    //       id: 2,
    //     },
    //     (resp: any) => {
    //       reslove(resp);
    //     },
    //   );
    // });
  }
}
