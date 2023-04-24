import type { Long } from '@grpc/proto-loader';
export interface ExtroBo {
    'nickname'?: (string);
    'sex'?: (string);
    'status'?: (boolean);
    'time'?: (number | string | Long);
}
export interface ExtroBo__Output {
    'nickname': (string);
    'sex': (string);
    'status': (boolean);
    'time': (string);
}
export declare class ExtroBoDto {
    'nickname': (string);
    'sex': (string);
    'status': (boolean);
    'time': (string);
}
export declare class ExtroBo__OutputDto {
    'nickname': (string);
    'sex': (string);
    'status': (boolean);
    'time': (string);
}
