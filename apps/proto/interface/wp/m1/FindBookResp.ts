// Original file: proto/wp/m1/wp_m1_book.proto

import type { BookBo as _wp_m1_BookBo, BookBo__Output as _wp_m1_BookBo__Output } from '../../wp/m1/BookBo';

export interface FindBookResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_wp_m1_BookBo)[];
}

export interface FindBookResp__Output {
  'code': (number);
  'msg': (string);
  'list': (_wp_m1_BookBo__Output)[];
}
