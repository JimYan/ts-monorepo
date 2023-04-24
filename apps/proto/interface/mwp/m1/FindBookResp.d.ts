import type { BookBo as _mwp_m1_BookBo, BookBo__Output as _mwp_m1_BookBo__Output } from '../../mwp/m1/BookBo';
import { BookBo__OutputDto as _mwp_m1_BookBo__OutputDto } from '../../mwp/m1/BookBo';
export interface FindBookResp {
    'code'?: (number);
    'msg'?: (string);
    'list'?: (_mwp_m1_BookBo)[];
}
export interface FindBookResp__Output {
    'code': (number);
    'msg': (string);
    'list': (_mwp_m1_BookBo__Output)[];
}
export declare class FindBookRespDto {
    'code': (number);
    'msg': (string);
    'list': (_mwp_m1_BookBo__OutputDto)[];
}
export declare class FindBookResp__OutputDto {
    'code': (number);
    'msg': (string);
    'list': (_mwp_m1_BookBo__OutputDto)[];
}
