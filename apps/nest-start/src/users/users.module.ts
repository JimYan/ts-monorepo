import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TaskService } from './task/task.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TaskService]
})
export class UsersModule {}
