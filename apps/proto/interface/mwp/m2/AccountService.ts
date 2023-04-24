// Original file: proto/mwp/m2/mwp_m2_account.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;

import type { FindAccountReq as _mwp_m2_FindAccountReq, FindAccountReq__Output as _mwp_m2_FindAccountReq__Output } from '../../mwp/m2/FindAccountReq';
import { FindAccountReqDto as _mwp_m2_FindAccountReqDto,FindAccountReq__OutputDto as _mwp_m2_FindAccountReq__OutputDto } from '../../mwp/m2/FindAccountReq';
import type { FindAccountResp as _mwp_m2_FindAccountResp, FindAccountResp__Output as _mwp_m2_FindAccountResp__Output } from '../../mwp/m2/FindAccountResp';
import { FindAccountRespDto as _mwp_m2_FindAccountRespDto,FindAccountResp__OutputDto as _mwp_m2_FindAccountResp__OutputDto } from '../../mwp/m2/FindAccountResp';

export interface AccountServiceClient extends grpc.Client {
  FindAccount(argument: _mwp_m2_FindAccountReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  FindAccount(argument: _mwp_m2_FindAccountReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  FindAccount(argument: _mwp_m2_FindAccountReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  FindAccount(argument: _mwp_m2_FindAccountReq, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  FindAccount(argument: _mwp_m2_FindAccountReqDto, metadata?: Metadata) : Observable<_mwp_m2_FindAccountResp__OutputDto>;
  findAccount(argument: _mwp_m2_FindAccountReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  findAccount(argument: _mwp_m2_FindAccountReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  findAccount(argument: _mwp_m2_FindAccountReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  findAccount(argument: _mwp_m2_FindAccountReq, callback: grpc.requestCallback<_mwp_m2_FindAccountResp__Output>): grpc.ClientUnaryCall;
  findAccount(argument: _mwp_m2_FindAccountReqDto, metadata?: Metadata) : Observable<_mwp_m2_FindAccountResp__OutputDto>;
  
}

export interface AccountServiceHandlers extends grpc.UntypedServiceImplementation {
  FindAccount: grpc.handleUnaryCall<_mwp_m2_FindAccountReq__Output, _mwp_m2_FindAccountResp>;
  
}

export interface AccountServiceDefinition extends grpc.ServiceDefinition {
  FindAccount: MethodDefinition<_mwp_m2_FindAccountReq, _mwp_m2_FindAccountResp, _mwp_m2_FindAccountReq__Output, _mwp_m2_FindAccountResp__Output>
}
