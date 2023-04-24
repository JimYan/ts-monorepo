import { ApiProperty } from '@nestjs/swagger';

export class FindHeroDto {
  id: number;
  name: string;

  @ApiProperty()
  age: number;
}
