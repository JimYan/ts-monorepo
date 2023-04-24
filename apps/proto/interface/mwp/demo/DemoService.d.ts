import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import type { FindAccountReq as _mwp_demo_FindAccountReq, FindAccountReq__Output as _mwp_demo_FindAccountReq__Output } from '../../mwp/demo/FindAccountReq';
import { FindAccountReqDto as _mwp_demo_FindAccountReqDto } from '../../mwp/demo/FindAccountReq';
import type { FindAccountResp as _mwp_demo_FindAccountResp, FindAccountResp__Output as _mwp_demo_FindAccountResp__Output } from '../../mwp/demo/FindAccountResp';
import { FindAccountResp__OutputDto as _mwp_demo_FindAccountResp__OutputDto } from '../../mwp/demo/FindAccountResp';
export interface DemoServiceClient extends grpc.Client {
    FindAccount(argument: _mwp_demo_FindAccountReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    FindAccount(argument: _mwp_demo_FindAccountReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    FindAccount(argument: _mwp_demo_FindAccountReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    FindAccount(argument: _mwp_demo_FindAccountReq, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    FindAccount(argument: _mwp_demo_FindAccountReqDto, metadata?: Metadata): Observable<_mwp_demo_FindAccountResp__OutputDto>;
    findAccount(argument: _mwp_demo_FindAccountReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    findAccount(argument: _mwp_demo_FindAccountReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    findAccount(argument: _mwp_demo_FindAccountReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    findAccount(argument: _mwp_demo_FindAccountReq, callback: grpc.requestCallback<_mwp_demo_FindAccountResp__Output>): grpc.ClientUnaryCall;
    findAccount(argument: _mwp_demo_FindAccountReqDto, metadata?: Metadata): Observable<_mwp_demo_FindAccountResp__OutputDto>;
}
export interface DemoServiceHandlers extends grpc.UntypedServiceImplementation {
    FindAccount: grpc.handleUnaryCall<_mwp_demo_FindAccountReq__Output, _mwp_demo_FindAccountResp>;
}
export interface DemoServiceDefinition extends grpc.ServiceDefinition {
    FindAccount: MethodDefinition<_mwp_demo_FindAccountReq, _mwp_demo_FindAccountResp, _mwp_demo_FindAccountReq__Output, _mwp_demo_FindAccountResp__Output>;
}
