/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Module } from "@nestjs/common";
import { AccountServiceClientStub } from "./AccountServiceClientStub";
@Module({
  providers: [],
  controllers: [],
})
export class AccountServiceModule {
  static forRoot(uri: string): DynamicModule {
    return {
      global: true,
      module: AccountServiceModule,
      providers: [AccountServiceClientStub,{
          provide: "SERVICE_URI",
          useValue: uri,
        }],
      exports: [AccountServiceClientStub],
    };
  }
}

