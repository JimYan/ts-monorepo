// Original file: proto/wp/m1/wp_m1_hero.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;

import type { FindManyReq as _wp_m1_FindManyReq, FindManyReq__Output as _wp_m1_FindManyReq__Output } from '../../wp/m1/FindManyReq';
import type { FindManyResp as _wp_m1_FindManyResp, FindManyResp__Output as _wp_m1_FindManyResp__Output } from '../../wp/m1/FindManyResp';
import type { FindOneReq as _wp_m1_FindOneReq, FindOneReq__Output as _wp_m1_FindOneReq__Output } from '../../wp/m1/FindOneReq';
import type { FindOneResp as _wp_m1_FindOneResp, FindOneResp__Output as _wp_m1_FindOneResp__Output } from '../../wp/m1/FindOneResp';

export interface HeroesServiceClient extends grpc.Client {
  FindMany(argument: _wp_m1_FindManyReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _wp_m1_FindManyReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _wp_m1_FindManyReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _wp_m1_FindManyReq, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _wp_m1_FindManyReq, metadata?: Metadata) : Observable<_wp_m1_FindManyResp__Output>;
  findMany(argument: _wp_m1_FindManyReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _wp_m1_FindManyReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _wp_m1_FindManyReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _wp_m1_FindManyReq, callback: grpc.requestCallback<_wp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _wp_m1_FindManyReq, metadata?: Metadata) : Observable<_wp_m1_FindManyResp__Output>;
  
  FindOne(argument: _wp_m1_FindOneReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _wp_m1_FindOneReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _wp_m1_FindOneReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _wp_m1_FindOneReq, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _wp_m1_FindOneReq, metadata?: Metadata) : Observable<_wp_m1_FindOneResp__Output>;
  findOne(argument: _wp_m1_FindOneReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _wp_m1_FindOneReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _wp_m1_FindOneReq, options: grpc.CallOptions, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _wp_m1_FindOneReq, callback: grpc.requestCallback<_wp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _wp_m1_FindOneReq, metadata?: Metadata) : Observable<_wp_m1_FindOneResp__Output>;
  
}

export interface HeroesServiceHandlers extends grpc.UntypedServiceImplementation {
  FindMany: grpc.handleUnaryCall<_wp_m1_FindManyReq__Output, _wp_m1_FindManyResp>;
  
  FindOne: grpc.handleUnaryCall<_wp_m1_FindOneReq__Output, _wp_m1_FindOneResp>;
  
}

export interface HeroesServiceDefinition extends grpc.ServiceDefinition {
  FindMany: MethodDefinition<_wp_m1_FindManyReq, _wp_m1_FindManyResp, _wp_m1_FindManyReq__Output, _wp_m1_FindManyResp__Output>
  FindOne: MethodDefinition<_wp_m1_FindOneReq, _wp_m1_FindOneResp, _wp_m1_FindOneReq__Output, _wp_m1_FindOneResp__Output>
}
