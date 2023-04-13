import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { BookServiceClient as _wp_m1_BookServiceClient, BookServiceDefinition as _wp_m1_BookServiceDefinition } from './wp/m1/BookService';
import type { HeroesServiceClient as _wp_m1_HeroesServiceClient, HeroesServiceDefinition as _wp_m1_HeroesServiceDefinition } from './wp/m1/HeroesService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  wp: {
    m1: {
      BookBo: MessageTypeDefinition
      BookService: SubtypeConstructor<typeof grpc.Client, _wp_m1_BookServiceClient> & { service: _wp_m1_BookServiceDefinition }
      FindBookReq: MessageTypeDefinition
      FindBookResp: MessageTypeDefinition
      FindManyReq: MessageTypeDefinition
      FindManyResp: MessageTypeDefinition
      FindOneReq: MessageTypeDefinition
      FindOneResp: MessageTypeDefinition
      HeroBo: MessageTypeDefinition
      HeroesService: SubtypeConstructor<typeof grpc.Client, _wp_m1_HeroesServiceClient> & { service: _wp_m1_HeroesServiceDefinition }
    }
  }
}

