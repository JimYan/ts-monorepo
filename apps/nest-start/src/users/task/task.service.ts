import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { UsersService } from '../users.service';

@Injectable()
export class TaskService {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger('user/taskservice');

  @Cron('* * * * * *')
  async handleCron() {
    // const info = await this.usersService.findOne(2);
    // console.log(info);
    this.logger.debug('Called when the current second');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
