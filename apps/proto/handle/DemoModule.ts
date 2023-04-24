/* eslint-disable */
import { DynamicModule, Module } from "@nestjs/common";
import { DemoService } from "./DemoService";

@Module({
  providers: [],
  controllers: [],
})
export class DemoModule {
  static forRoot(uri=''): DynamicModule {
    return {
      global: true,
      module: DemoModule,
      providers: [DemoService,{
          provide: "SERVICE_URI",
          useValue: uri,
      }],
      exports: [DemoService],
    };
  }
}
