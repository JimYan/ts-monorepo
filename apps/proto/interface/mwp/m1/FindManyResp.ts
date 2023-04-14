// Original file: proto/mwp/m1/mwp_m1_hero.proto

import type { HeroBo as _mwp_m1_HeroBo, HeroBo__Output as _mwp_m1_HeroBo__Output } from '../../mwp/m1/HeroBo';

export interface FindManyResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m1_HeroBo)[];
}

export interface FindManyResp__Output {
  'code': (number);
  'msg': (string);
  'list': (_mwp_m1_HeroBo__Output)[];
}
