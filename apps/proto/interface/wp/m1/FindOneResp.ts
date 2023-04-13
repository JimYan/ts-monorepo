// Original file: proto/wp/m1/wp_m1_hero.proto

import type { HeroBo as _wp_m1_HeroBo, HeroBo__Output as _wp_m1_HeroBo__Output } from '../../wp/m1/HeroBo';

export interface FindOneResp {
  'code'?: (number);
  'msg'?: (string);
  'hero'?: (_wp_m1_HeroBo | null);
  '_hero'?: "hero";
}

export interface FindOneResp__Output {
  'code': (number);
  'msg': (string);
  'hero'?: (_wp_m1_HeroBo__Output | null);
  '_hero': "hero";
}
