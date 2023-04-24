// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';


export interface FindManyReq {
  'source'?: (string);
  'id'?: (number);
}

export interface FindManyReq__Output {
/*test*/
  'source': (string);
  'id': (number);
}


export class FindManyReqDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
export class FindManyReq__OutputDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
