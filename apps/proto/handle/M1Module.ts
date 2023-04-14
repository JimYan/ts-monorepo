/* eslint-disable */
import { DynamicModule, Module } from "@nestjs/common";
import { M1Service } from "./M1Service";

@Module({
  providers: [],
  controllers: [],
})
export class M1Module {
  static forRoot(uri: string): DynamicModule {
    return {
      global: true,
      module: M1Module,
      providers: [M1Service,{
          provide: "SERVICE_URI",
          useValue: uri,
      }],
      exports: [M1Service],
    };
  }
}
