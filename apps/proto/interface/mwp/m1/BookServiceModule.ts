/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Module } from "@nestjs/common";
import { BookServiceClientStub } from "./BookServiceClientStub";
@Module({
  providers: [],
  controllers: [],
})
export class BookServiceModule {
  static forRoot(uri: string): DynamicModule {
    return {
      global: true,
      module: BookServiceModule,
      providers: [BookServiceClientStub,{
          provide: "SERVICE_URI",
          useValue: uri,
        }],
      exports: [BookServiceClientStub],
    };
  }
}

