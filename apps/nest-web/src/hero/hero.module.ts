import { Module } from '@nestjs/common';
import { HeroController } from './hero/hero.controller';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [],
})
export class HeroModule {}
