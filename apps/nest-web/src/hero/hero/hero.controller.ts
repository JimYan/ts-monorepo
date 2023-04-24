import { Controller, Get, Inject, Logger, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { M1Service } from '@nighttrax/proto/handle/M1Service';
import { M2Service } from '@nighttrax/proto/handle/M2Service';
import { ApiResponse } from 'src/common/Decorator';
import { FindHeroDto } from './hero.dto';
import { FindOneRespDto } from '@nighttrax/proto/interface/mwp/m1/FindOneResp';
import { FindManyRespDto } from '@nighttrax/proto/interface/mwp/m1/FindManyResp';
// import { HeroBoDto } from '@nighttrax/proto/interface/mwp/m1/HeroBo';

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
  @ApiResponse('class', FindOneRespDto)
  async findHero(@Query() x: FindHeroDto) {
    console.log(x);
    const info = await this.M1Service.HeroesServiceStub.findOne({
      source: 'herocontrollerXXX',
      id: 2,
    }).toPromise();
    this.logger.log('xxy', info);
    return info;
  }

  @Get('/getAccount')
  @ApiResponse('class', FindManyRespDto)
  async findAccount() {
    const heroinfo = await this.M1Service.HeroesServiceStub.FindMany({
      source: 'asdf',
      id: 1,
    }).toPromise();
    // this.logger.log(heroinfo.hero.id);

    const info = await this.M1Service.BookServiceStub.FindBook({
      source: 'asdf',
      id: 1,
    });

    // const account = await this.M2Service.AccountServiceStub.FindAccount({
    //   source: 'hero.controller',
    //   id: 1,
    // }).toPromise();
    // this.logger.log('account', account);

    // this.logger.log(await info.toPromise());
    return heroinfo;
  }
}
