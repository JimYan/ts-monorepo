// Original file: proto/mwp/m1/mwp_m1_hero.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;

import type { FindManyReq as _mwp_m1_FindManyReq, FindManyReq__Output as _mwp_m1_FindManyReq__Output } from '../../mwp/m1/FindManyReq';
import { FindManyReqDto as _mwp_m1_FindManyReqDto,FindManyReq__OutputDto as _mwp_m1_FindManyReq__OutputDto } from '../../mwp/m1/FindManyReq';
import type { FindManyResp as _mwp_m1_FindManyResp, FindManyResp__Output as _mwp_m1_FindManyResp__Output } from '../../mwp/m1/FindManyResp';
import { FindManyRespDto as _mwp_m1_FindManyRespDto,FindManyResp__OutputDto as _mwp_m1_FindManyResp__OutputDto } from '../../mwp/m1/FindManyResp';
import type { FindOneReq as _mwp_m1_FindOneReq, FindOneReq__Output as _mwp_m1_FindOneReq__Output } from '../../mwp/m1/FindOneReq';
import { FindOneReqDto as _mwp_m1_FindOneReqDto,FindOneReq__OutputDto as _mwp_m1_FindOneReq__OutputDto } from '../../mwp/m1/FindOneReq';
import type { FindOneResp as _mwp_m1_FindOneResp, FindOneResp__Output as _mwp_m1_FindOneResp__Output } from '../../mwp/m1/FindOneResp';
import { FindOneRespDto as _mwp_m1_FindOneRespDto,FindOneResp__OutputDto as _mwp_m1_FindOneResp__OutputDto } from '../../mwp/m1/FindOneResp';

export interface HeroesServiceClient extends grpc.Client {
  FindMany(argument: _mwp_m1_FindManyReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _mwp_m1_FindManyReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _mwp_m1_FindManyReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _mwp_m1_FindManyReq, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  FindMany(argument: _mwp_m1_FindManyReqDto, metadata?: Metadata) : Observable<_mwp_m1_FindManyResp__OutputDto>;
  findMany(argument: _mwp_m1_FindManyReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _mwp_m1_FindManyReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _mwp_m1_FindManyReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _mwp_m1_FindManyReq, callback: grpc.requestCallback<_mwp_m1_FindManyResp__Output>): grpc.ClientUnaryCall;
  findMany(argument: _mwp_m1_FindManyReqDto, metadata?: Metadata) : Observable<_mwp_m1_FindManyResp__OutputDto>;
  
  FindOne(argument: _mwp_m1_FindOneReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _mwp_m1_FindOneReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _mwp_m1_FindOneReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _mwp_m1_FindOneReq, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _mwp_m1_FindOneReqDto, metadata?: Metadata) : Observable<_mwp_m1_FindOneResp__OutputDto>;
  findOne(argument: _mwp_m1_FindOneReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _mwp_m1_FindOneReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _mwp_m1_FindOneReq, options: grpc.CallOptions, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _mwp_m1_FindOneReq, callback: grpc.requestCallback<_mwp_m1_FindOneResp__Output>): grpc.ClientUnaryCall;
  findOne(argument: _mwp_m1_FindOneReqDto, metadata?: Metadata) : Observable<_mwp_m1_FindOneResp__OutputDto>;
  
}

export interface HeroesServiceHandlers extends grpc.UntypedServiceImplementation {
  FindMany: grpc.handleUnaryCall<_mwp_m1_FindManyReq__Output, _mwp_m1_FindManyResp>;
  
  FindOne: grpc.handleUnaryCall<_mwp_m1_FindOneReq__Output, _mwp_m1_FindOneResp>;
  
}

export interface HeroesServiceDefinition extends grpc.ServiceDefinition {
  FindMany: MethodDefinition<_mwp_m1_FindManyReq, _mwp_m1_FindManyResp, _mwp_m1_FindManyReq__Output, _mwp_m1_FindManyResp__Output>
  FindOne: MethodDefinition<_mwp_m1_FindOneReq, _mwp_m1_FindOneResp, _mwp_m1_FindOneReq__Output, _mwp_m1_FindOneResp__Output>
}
