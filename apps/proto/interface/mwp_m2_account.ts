import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AccountServiceClient as _mwp_m2_AccountServiceClient, AccountServiceDefinition as _mwp_m2_AccountServiceDefinition } from './mwp/m2/AccountService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  mwp: {
    m2: {
      AccountBo: MessageTypeDefinition
      AccountService: SubtypeConstructor<typeof grpc.Client, _mwp_m2_AccountServiceClient> & { service: _mwp_m2_AccountServiceDefinition }
      FindAccountReq: MessageTypeDefinition
      FindAccountResp: MessageTypeDefinition
    }
  }
}

