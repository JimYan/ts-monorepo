// Original file: src/hero/proto/hero.proto
import { Max } from 'class-validator';

export class HeroById {
  @Max(100)
  id?: number;
}

export interface HeroById__Output {
  id: number;
}
