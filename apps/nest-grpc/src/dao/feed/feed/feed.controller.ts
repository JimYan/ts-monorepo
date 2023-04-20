import { Controller, Get } from '@nestjs/common';

@Controller('feed')
export class FeedController {
  @Get()
  getFeed() {
    return 'a';
  }
}
