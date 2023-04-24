import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';
import type { DemoServiceClient as _mwp_demo_DemoServiceClient, DemoServiceDefinition as _mwp_demo_DemoServiceDefinition } from './mwp/demo/DemoService';
type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
    new (...args: ConstructorParameters<Constructor>): Subtype;
};
export interface ProtoGrpcType {
    mwp: {
        demo: {
            AccountBo: MessageTypeDefinition;
            DemoService: SubtypeConstructor<typeof grpc.Client, _mwp_demo_DemoServiceClient> & {
                service: _mwp_demo_DemoServiceDefinition;
            };
            FindAccountReq: MessageTypeDefinition;
            FindAccountResp: MessageTypeDefinition;
        };
    };
}
export {};
