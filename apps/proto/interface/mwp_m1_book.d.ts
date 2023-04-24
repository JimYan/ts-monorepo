import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';
import type { BookServiceClient as _mwp_m1_BookServiceClient, BookServiceDefinition as _mwp_m1_BookServiceDefinition } from './mwp/m1/BookService';
type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
    new (...args: ConstructorParameters<Constructor>): Subtype;
};
export interface ProtoGrpcType {
    mwp: {
        m1: {
            BookBo: MessageTypeDefinition;
            BookService: SubtypeConstructor<typeof grpc.Client, _mwp_m1_BookServiceClient> & {
                service: _mwp_m1_BookServiceDefinition;
            };
            FindBookReq: MessageTypeDefinition;
            FindBookResp: MessageTypeDefinition;
        };
    };
}
export {};
