import { Controller, Get, Inject } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  @Inject(CatsService)
  private readonly catsService: CatsService;

  //   constructor(private readonly catsService: CatsService) {}

  @Get()
  catHello(): string {
    return 'cathello' + this.catsService.getHello();
  }
}
