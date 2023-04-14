// Original file: proto/mwp/m2/mwp_m2_account.proto

import type { AccountBo as _mwp_m2_AccountBo, AccountBo__Output as _mwp_m2_AccountBo__Output } from '../../mwp/m2/AccountBo';

export interface FindAccountResp {
  'code'?: (number);
  'msg'?: (string);
  'list'?: (_mwp_m2_AccountBo)[];
}

export interface FindAccountResp__Output {
  'code': (number);
  'msg': (string);
  'list': (_mwp_m2_AccountBo__Output)[];
}
