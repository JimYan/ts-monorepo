import { Controller, Get, Inject } from '@nestjs/common';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  @Inject(HeroService)
  private readonly heroService: HeroService;

  @Get()
  async findHero() {
    const info = await this.heroService.heroesService
      .findOne({
        source: 'heroservice',
        id: 1,
      })
      .toPromise();
    console.log(info);
    return info.hero;
  }
}
