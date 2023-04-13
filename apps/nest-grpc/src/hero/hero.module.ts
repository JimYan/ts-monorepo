import { Module } from '@nestjs/common';
import { HeroController } from './hero/hero.controller';
import { UsersModule } from 'src/users/users.module';
import { PhotoModule } from 'src/photo/photo.module';
import { BookController } from './book/book.controller';

@Module({
  imports: [UsersModule, PhotoModule],
  controllers: [HeroController, BookController],
  providers: [],
})
export class HeroModule {}
