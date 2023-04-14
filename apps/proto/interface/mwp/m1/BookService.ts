// Original file: proto/mwp/m1/mwp_m1_book.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;

import type { FindBookReq as _mwp_m1_FindBookReq, FindBookReq__Output as _mwp_m1_FindBookReq__Output } from '../../mwp/m1/FindBookReq';
import type { FindBookResp as _mwp_m1_FindBookResp, FindBookResp__Output as _mwp_m1_FindBookResp__Output } from '../../mwp/m1/FindBookResp';

export interface BookServiceClient extends grpc.Client {
  FindBook(argument: _mwp_m1_FindBookReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _mwp_m1_FindBookReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _mwp_m1_FindBookReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _mwp_m1_FindBookReq, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _mwp_m1_FindBookReq, metadata?: Metadata) : Observable<_mwp_m1_FindBookResp__Output>;
  findBook(argument: _mwp_m1_FindBookReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _mwp_m1_FindBookReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _mwp_m1_FindBookReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _mwp_m1_FindBookReq, callback: grpc.requestCallback<_mwp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _mwp_m1_FindBookReq, metadata?: Metadata) : Observable<_mwp_m1_FindBookResp__Output>;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  FindBook: grpc.handleUnaryCall<_mwp_m1_FindBookReq__Output, _mwp_m1_FindBookResp>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  FindBook: MethodDefinition<_mwp_m1_FindBookReq, _mwp_m1_FindBookResp, _mwp_m1_FindBookReq__Output, _mwp_m1_FindBookResp__Output>
}
