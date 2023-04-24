// Original file: proto/mwp/m1/mwp_m1_book.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';


export interface FindBookReq {
  'source'?: (string);
  'id'?: (number);
}

export interface FindBookReq__Output {
/*test*/
  'source': (string);
  'id': (number);
}


export class FindBookReqDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
export class FindBookReq__OutputDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
