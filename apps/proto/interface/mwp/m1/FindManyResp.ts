// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { HeroBo as _mwp_m1_HeroBo, HeroBo__Output as _mwp_m1_HeroBo__Output } from '../../mwp/m1/HeroBo';
import { HeroBoDto as _mwp_m1_HeroBoDto,HeroBo__OutputDto as _mwp_m1_HeroBo__OutputDto } from '../../mwp/m1/HeroBo';

export interface FindManyResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m1_HeroBo)[];
}

export interface FindManyResp__Output {
/*test*/
  'code': (number);
  'msg': (string);
  'list': (_mwp_m1_HeroBo__Output)[];
}


export class FindManyRespDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m1_HeroBo__OutputDto]})
  'list': (_mwp_m1_HeroBo__OutputDto)[];
}
export class FindManyResp__OutputDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m1_HeroBo__OutputDto]})
  'list': (_mwp_m1_HeroBo__OutputDto)[];
}
