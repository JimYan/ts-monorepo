import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { BookServiceClientStub } from '@nighttrax/proto/interface/mwp/m1/BookServiceClientStub';
import { HeroesServiceClientStub } from '@nighttrax/proto/interface/mwp/m1/HeroesServiceClientStub';
import { AccountServiceClientStub } from '@nighttrax/proto/interface/mwp/m2/AccountServiceClientStub';

@Controller('hero')
export class HeroController {
  private readonly logger = new Logger('herocontroller');

  @Inject(HeroesServiceClientStub)
  private readonly heroesServiceClientStub: HeroesServiceClientStub;

  @Inject(BookServiceClientStub)
  private readonly bookServiceClientStub: BookServiceClientStub;

  @Inject(AccountServiceClientStub)
  private readonly accountServiceClientStub: AccountServiceClientStub;

  // @Get()
  // async findHero() {
  //   const info = await this.heroesServiceClientStub.stub
  //     .findOne({
  //       source: 'herocontroller',
  //       id: 1,
  //     })
  //     .toPromise();
  //   return info.hero;
  // }

  @Get('/getAccount')
  async findAccount() {
    const heroinfo = await this.heroesServiceClientStub.stub
      .findOne({
        source: 'asdf',
        id: 1,
      })
      .toPromise();
    this.logger.log(heroinfo);

    const info = await this.bookServiceClientStub.stub.FindBook({
      source: 'asdf',
      id: 1,
    });

    const account = await this.accountServiceClientStub.stub
      .FindAccount({
        source: 'hero.controller',
        id: 1,
      })
      .toPromise();
    this.logger.log('account', account);

    this.logger.log(await info.toPromise());
    return info;
  }
}
