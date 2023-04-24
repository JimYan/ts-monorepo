import type { AccountBo as _mwp_demo_AccountBo, AccountBo__Output as _mwp_demo_AccountBo__Output } from '../../mwp/demo/AccountBo';
import { AccountBo__OutputDto as _mwp_demo_AccountBo__OutputDto } from '../../mwp/demo/AccountBo';
export interface FindAccountResp {
    'code'?: (number);
    'msg'?: (string);
    'list'?: (_mwp_demo_AccountBo | null);
}
export interface FindAccountResp__Output {
    'code': (number);
    'msg': (string);
    'list': (_mwp_demo_AccountBo__Output | null);
}
export declare class FindAccountRespDto {
    'code': (number);
    'msg': (string);
    'list': (_mwp_demo_AccountBo__OutputDto | null);
}
export declare class FindAccountResp__OutputDto {
    'code': (number);
    'msg': (string);
    'list': (_mwp_demo_AccountBo__OutputDto | null);
}
