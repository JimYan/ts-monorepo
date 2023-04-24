// Original file: proto/mwp/m2/mwp_m2_account.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';

import type { AccountBo as _mwp_m2_AccountBo, AccountBo__Output as _mwp_m2_AccountBo__Output } from '../../mwp/m2/AccountBo';
import { AccountBoDto as _mwp_m2_AccountBoDto,AccountBo__OutputDto as _mwp_m2_AccountBo__OutputDto } from '../../mwp/m2/AccountBo';

export interface FindAccountResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m2_AccountBo)[];
}

export interface FindAccountResp__Output {
/*test*/
  'code': (number);
  'msg': (string);
  'list': (_mwp_m2_AccountBo__Output)[];
}


export class FindAccountRespDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m2_AccountBo__OutputDto]})
  'list': (_mwp_m2_AccountBo__OutputDto)[];
}
export class FindAccountResp__OutputDto {
  @ApiProperty()
  'code': (number);
  @ApiProperty()
  'msg': (string);
  @ApiProperty({type: [_mwp_m2_AccountBo__OutputDto]})
  'list': (_mwp_m2_AccountBo__OutputDto)[];
}
