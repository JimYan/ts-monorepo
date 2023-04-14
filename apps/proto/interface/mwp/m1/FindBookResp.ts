// Original file: proto/mwp/m1/mwp_m1_book.proto

import type { BookBo as _mwp_m1_BookBo, BookBo__Output as _mwp_m1_BookBo__Output } from '../../mwp/m1/BookBo';

export interface FindBookResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m1_BookBo)[];
}

export interface FindBookResp__Output {
  'code': (number);
  'msg': (string);
  'list': (_mwp_m1_BookBo__Output)[];
}
