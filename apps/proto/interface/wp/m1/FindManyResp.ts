// Original file: proto/wp/m1/wp_m1_hero.proto

import type { HeroBo as _wp_m1_HeroBo, HeroBo__Output as _wp_m1_HeroBo__Output } from '../../wp/m1/HeroBo';

export interface FindManyResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_wp_m1_HeroBo)[];
}

export interface FindManyResp__Output {
  'code': (number);
  'msg': (string);
  'list': (_wp_m1_HeroBo__Output)[];
}
