// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { HeroBo as _mwp_m1_HeroBo, HeroBo__Output as _mwp_m1_HeroBo__Output } from '../../mwp/m1/HeroBo';
import { HeroBoDto as _mwp_m1_HeroBoDto,HeroBo__OutputDto as _mwp_m1_HeroBo__OutputDto } from '../../mwp/m1/HeroBo';

export interface FindOneResp {
  'code'?: (number);
  'msg'?: (string);
  'hero'?: (_mwp_m1_HeroBo | null);
}

export interface FindOneResp__Output {
/*test*/
  'code': (number);
  'msg': (string);
  'hero': (_mwp_m1_HeroBo__Output | null);
}


export class FindOneRespDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: ()=>_mwp_m1_HeroBo__OutputDto})
  'hero': (_mwp_m1_HeroBo__OutputDto | null);
}
export class FindOneResp__OutputDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: ()=>_mwp_m1_HeroBo__OutputDto})
  'hero': (_mwp_m1_HeroBo__OutputDto | null);
}
