import { DynamicModule, Module } from "@nestjs/common";
import { M1Service } from "./M1Service";

@Module({
  providers: [],
  controllers: [],
})
export class M1Module {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: M1Module,
      providers: [M1Service],
      exports: [M1Service],
    };
  }
}
