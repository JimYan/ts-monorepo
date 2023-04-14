import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { AccountServiceClient } from "../interface/mwp/m2/AccountService";
import { join } from "path";

export const m1 = {
  options: {
    package: "mwp.m2",
    url: "127.0.0.1:3003",
    protoPath: join(__dirname, "../proto/mwp/m2/mwp_m2_account.proto"),
  },
};

@Injectable()
export class M2Service implements OnModuleInit {
  public accountServiceClient!: AccountServiceClient;

  onModuleInit() {
    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      ...m1,
    });

    this.accountServiceClient = client.getService("AccountService");
  }
}
