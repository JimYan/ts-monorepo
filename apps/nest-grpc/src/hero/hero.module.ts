import { Module } from '@nestjs/common';
import { HeroController } from './hero/hero.controller';
import { UsersModule } from 'src/users/users.module';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [UsersModule, PhotoModule],
  controllers: [HeroController],
  providers: [],
})
export class HeroModule {}
