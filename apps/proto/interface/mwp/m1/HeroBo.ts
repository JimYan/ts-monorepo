// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { ExtroBo as _mwp_m1_ExtroBo, ExtroBo__Output as _mwp_m1_ExtroBo__Output } from '../../mwp/m1/ExtroBo';
import { ExtroBoDto as _mwp_m1_ExtroBoDto,ExtroBo__OutputDto as _mwp_m1_ExtroBo__OutputDto } from '../../mwp/m1/ExtroBo';

export interface HeroBo {
  'id'?: (number);
  'name'?: (string);
  'extro'?: (_mwp_m1_ExtroBo | null);
}

export interface HeroBo__Output {
/*test*/
  'id': (number);
  'name': (string);
  'extro': (_mwp_m1_ExtroBo__Output | null);
}


export class HeroBoDto {
  @ApiProperty()
  'id': (number);
  @ApiProperty()
  'name': (string);
  @ApiProperty({type: ()=>_mwp_m1_ExtroBo__OutputDto})
  'extro': (_mwp_m1_ExtroBo__OutputDto | null);
}
export class HeroBo__OutputDto {
  @ApiProperty()
  'id': (number);
  @ApiProperty()
  'name': (string);
  @ApiProperty({type: ()=>_mwp_m1_ExtroBo__OutputDto})
  'extro': (_mwp_m1_ExtroBo__OutputDto | null);
}
