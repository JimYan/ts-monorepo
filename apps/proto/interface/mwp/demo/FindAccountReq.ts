// Original file: proto/mwp/demo/mwp_demo_main.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';


export interface FindAccountReq {
  'source'?: (string);
  'id'?: (number);
}

export interface FindAccountReq__Output {
/*test*/
  'source': (string);
  'id': (number);
}


export class FindAccountReqDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
export class FindAccountReq__OutputDto {
  @ApiProperty()
  'source': (string);
  @ApiProperty()
  'id': (number);
}
