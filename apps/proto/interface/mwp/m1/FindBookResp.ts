// Original file: proto/mwp/m1/mwp_m1_book.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { BookBo as _mwp_m1_BookBo, BookBo__Output as _mwp_m1_BookBo__Output } from '../../mwp/m1/BookBo';
import { BookBoDto as _mwp_m1_BookBoDto,BookBo__OutputDto as _mwp_m1_BookBo__OutputDto } from '../../mwp/m1/BookBo';

export interface FindBookResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m1_BookBo)[];
}

export interface FindBookResp__Output {
/*test*/
  'code': (number);
  'msg': (string);
  'list': (_mwp_m1_BookBo__Output)[];
}


export class FindBookRespDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m1_BookBo__OutputDto]})
  'list': (_mwp_m1_BookBo__OutputDto)[];
}
export class FindBookResp__OutputDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m1_BookBo__OutputDto]})
  'list': (_mwp_m1_BookBo__OutputDto)[];
}
