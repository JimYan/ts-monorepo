import { Controller, Get, Inject } from '@nestjs/common';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  @Inject(HeroService)
  private readonly heroService: HeroService;

  @Get()
  async findHero() {
    const info = await this.heroService.getHero();
    console.log(info);
    return info;
    // return 'asdf';
  }
}
