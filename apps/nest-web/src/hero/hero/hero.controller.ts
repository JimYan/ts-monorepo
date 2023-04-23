import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { M1Service } from '@nighttrax/proto/handle/M1Service';
import { M2Service } from '@nighttrax/proto/handle/M2Service';
import { FindHeroDto } from './hero.dto';

@Controller('hero')
@ApiTags('hero')
export class HeroController {
  private readonly logger = new Logger('herocontroller');

  @Inject(M1Service)
  private readonly M1Service: M1Service;

  @Inject(M2Service)
  private readonly M2Service: M2Service;

  @Get()
  // @ApiQuery({ type: FindHeroDto })
  async findHero(@Query() x: FindHeroDto) {
    console.log(x);
    const info = await this.M1Service.HeroesServiceStub.findOne({
      source: 'herocontrollerXXX',
      id: 2,
    }).toPromise();
    return info.hero;
  }

  @Get('/getAccount')
  async findAccount() {
    const heroinfo = await this.M1Service.HeroesServiceStub.findOne({
      source: 'asdf',
      id: 1,
    }).toPromise();
    this.logger.log(heroinfo);

    const info = await this.M1Service.BookServiceStub.FindBook({
      source: 'asdf',
      id: 1,
    });

    const account = await this.M2Service.AccountServiceStub.FindAccount({
      source: 'hero.controller',
      id: 1,
    }).toPromise();
    this.logger.log('account', account);

    this.logger.log(await info.toPromise());
    return info;
  }
}
