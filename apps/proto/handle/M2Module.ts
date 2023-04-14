import { DynamicModule, Module } from "@nestjs/common";
import { M2Service } from "../handle/M2Service";

@Module({
  providers: [],
  controllers: [],
})
export class M2Module {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: M2Module,
      providers: [M2Service],
      exports: [M2Service],
    };
  }
}
