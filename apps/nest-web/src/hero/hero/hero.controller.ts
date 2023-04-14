import { Controller, Get, Inject } from '@nestjs/common';
import { M1Service } from '@nighttrax/proto/handle/M1Service';
import { M2Service } from '@nighttrax/proto/handle/M2Service';

@Controller('hero')
export class HeroController {
  @Inject(M1Service)
  private readonly m1Service: M1Service;

  @Inject(M2Service)
  private readonly m2Service: M2Service;

  @Get()
  async findHero() {
    // const info = await this.heroService.heroesService
    //   .findOne({
    //     source: 'heroservice',
    //     id: 1,
    //   })
    //   .toPromise();
    const info = await this.m1Service.heroesServiceClient
      .findOne({
        source: 'herocontroller',
        id: 1,
      })
      .toPromise();
    return info.hero;
  }

  @Get('/getAccount')
  async findAccount() {
    const info = await this.m2Service.accountServiceClient
      .FindAccount({
        source: 'hero.controller',
        id: 1,
      })
      .toPromise();
    return info;
  }
}
