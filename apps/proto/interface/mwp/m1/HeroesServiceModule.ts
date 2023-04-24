/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Module } from "@nestjs/common";
import { HeroesServiceClientStub } from "./HeroesServiceClientStub";
@Module({
  providers: [],
  controllers: [],
})
export class HeroesServiceModule {
  static forRoot(uri: string): DynamicModule {
    return {
      global: true,
      module: HeroesServiceModule,
      providers: [HeroesServiceClientStub,{
          provide: "SERVICE_URI",
          useValue: uri,
        }],
      exports: [HeroesServiceClientStub],
    };
  }
}

