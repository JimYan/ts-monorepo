import { Module } from '@nestjs/common';
import { FeedserviceService } from './feedservice/feedservice.service';
import { FeedController } from './feed/feed.controller';

@Module({
  providers: [FeedserviceService],
  controllers: [FeedController],
  exports: [FeedserviceService],
})
export class FeedModule {}
