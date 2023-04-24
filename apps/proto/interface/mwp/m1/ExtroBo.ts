// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { Long } from '@grpc/proto-loader';

export interface ExtroBo {
  'nickname'?: (string);
  'sex'?: (string);
  'status'?: (boolean);
  'time'?: (number | string | Long);
}

export interface ExtroBo__Output {
/*test*/
  'nickname': (string);
  'sex': (string);
  'status': (boolean);
  'time': (string);
}


export class ExtroBoDto {
  @ApiProperty()
  'nickname': (string);
  @ApiProperty()
  'sex': (string);
  @ApiProperty()
  'status': (boolean);
  @ApiProperty()
  'time': (string);
}
export class ExtroBo__OutputDto {
  @ApiProperty()
  'nickname': (string);
  @ApiProperty()
  'sex': (string);
  @ApiProperty()
  'status': (boolean);
  @ApiProperty()
  'time': (string);
}
