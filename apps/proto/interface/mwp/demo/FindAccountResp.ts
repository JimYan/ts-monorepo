// Original file: proto/mwp/demo/mwp_demo_main.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { AccountBo as _mwp_demo_AccountBo, AccountBo__Output as _mwp_demo_AccountBo__Output } from '../../mwp/demo/AccountBo';
import { AccountBoDto as _mwp_demo_AccountBoDto,AccountBo__OutputDto as _mwp_demo_AccountBo__OutputDto } from '../../mwp/demo/AccountBo';

export interface FindAccountResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_demo_AccountBo | null);
}

export interface FindAccountResp__Output {
/*test*/
  'code': (number);
  'msg': (string);
  'list': (_mwp_demo_AccountBo__Output | null);
}


export class FindAccountRespDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: ()=>_mwp_demo_AccountBo__OutputDto})
  'list': (_mwp_demo_AccountBo__OutputDto | null);
}
export class FindAccountResp__OutputDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: ()=>_mwp_demo_AccountBo__OutputDto})
  'list': (_mwp_demo_AccountBo__OutputDto | null);
}
