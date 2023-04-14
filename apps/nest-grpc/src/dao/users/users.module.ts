import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserPrismaService } from './user-prisma/user-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserPrismaService],
  exports: [UsersService],
})
export class UsersModule {}
