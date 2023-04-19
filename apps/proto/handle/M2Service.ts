/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {getServiceByPGname} from "../src/service";
import * as grpc from '@grpc/grpc-js';
import {AccountServiceClient} from "../interface/mwp/m2/AccountService";
import { join } from "path";

@Injectable()
export class M2Service implements OnModuleInit {
  public AccountServiceStub!: AccountServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  async onModuleInit() {
    let extra: any = {}
    const url: string | undefined = this.url ? this.url : await getServiceByPGname("mwp.m2");
    if(!url){
      throw new Error("get service:mwp.m2 rpc url is null");
    }
    if(url && /:443$/.test(url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const AccountServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m2",
        url: url,
        protoPath: join(__dirname, "../proto/mwp/m2/mwp_m2_account.proto"),
        ...extra
      },
    });
    this.AccountServiceStub = AccountServiceClient.getService("AccountService");
  }
}
