import { Module } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AccountController } from './account/account.controller';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
