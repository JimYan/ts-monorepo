/* eslint-disable */
import { DynamicModule, Module } from "@nestjs/common";
import { M2Service } from "./M2Service";

@Module({
  providers: [],
  controllers: [],
})
export class M2Module {
  static forRoot(uri=''): DynamicModule {
    return {
      global: true,
      module: M2Module,
      providers: [M2Service,{
          provide: "SERVICE_URI",
          useValue: uri,
      }],
      exports: [M2Service],
    };
  }
}
