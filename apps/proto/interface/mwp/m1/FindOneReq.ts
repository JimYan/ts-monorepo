// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';


export interface FindOneReq {
  'source'?: (string);
  'id'?: (number);
}

export interface FindOneReq__Output {
/*test*/
  'source': (string);
  'id': (number);
}


export class FindOneReqDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
export class FindOneReq__OutputDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
