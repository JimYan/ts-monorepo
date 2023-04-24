import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(`hero/${TaskService.name}`);

  //   @Cron('* * * * * *')
  //   handleCron() {
  //     this.logger.debug('Called when the current second is 45');
  //   }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
