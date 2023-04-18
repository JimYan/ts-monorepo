/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import * as grpc from '@grpc/grpc-js';
import {AccountServiceClient} from "../interface/mwp/m2/AccountService";
import { join } from "path";

@Injectable()
export class M2Service implements OnModuleInit {
  public AccountServiceStub!: AccountServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    let extra: any = {}
    if(this.url && /:443$/.test(this.url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const AccountServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m2",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m2/mwp_m2_account.proto"),
        ...extra
      },
    });
    this.AccountServiceStub = AccountServiceClient.getService("AccountService");
  }
}
