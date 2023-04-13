// Original file: proto/wp/m1/wp_m1_book.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;

import type { FindBookReq as _wp_m1_FindBookReq, FindBookReq__Output as _wp_m1_FindBookReq__Output } from '../../wp/m1/FindBookReq';
import type { FindBookResp as _wp_m1_FindBookResp, FindBookResp__Output as _wp_m1_FindBookResp__Output } from '../../wp/m1/FindBookResp';

export interface BookServiceClient extends grpc.Client {
  FindBook(argument: _wp_m1_FindBookReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _wp_m1_FindBookReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _wp_m1_FindBookReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _wp_m1_FindBookReq, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  FindBook(argument: _wp_m1_FindBookReq, metadata?: Metadata) : Observable<_wp_m1_FindBookResp__Output>;
  findBook(argument: _wp_m1_FindBookReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _wp_m1_FindBookReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _wp_m1_FindBookReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _wp_m1_FindBookReq, callback: grpc.requestCallback<_wp_m1_FindBookResp__Output>): grpc.ClientUnaryCall;
  findBook(argument: _wp_m1_FindBookReq, metadata?: Metadata) : Observable<_wp_m1_FindBookResp__Output>;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  FindBook: grpc.handleUnaryCall<_wp_m1_FindBookReq__Output, _wp_m1_FindBookResp>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  FindBook: MethodDefinition<_wp_m1_FindBookReq, _wp_m1_FindBookResp, _wp_m1_FindBookReq__Output, _wp_m1_FindBookResp__Output>
}
