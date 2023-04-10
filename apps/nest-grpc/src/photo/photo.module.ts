import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoPrismaService } from './photo-prisma/photo-prisma.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService, PhotoPrismaService],
  exports: [PhotoService],
})
export class PhotoModule {}
