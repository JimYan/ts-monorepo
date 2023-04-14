// Original file: proto/mwp/m1/mwp_m1_hero.proto

import type { HeroBo as _mwp_m1_HeroBo, HeroBo__Output as _mwp_m1_HeroBo__Output } from '../../mwp/m1/HeroBo';

export interface FindOneResp {
  'code'?: (number);
  'msg'?: (string);
  'hero'?: (_mwp_m1_HeroBo | null);
  '_hero'?: "hero";
}

export interface FindOneResp__Output {
  'code': (number);
  'msg': (string);
  'hero'?: (_mwp_m1_HeroBo__Output | null);
  '_hero': "hero";
}
