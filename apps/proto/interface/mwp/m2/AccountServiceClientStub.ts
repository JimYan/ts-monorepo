/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { AccountServiceClient as clientType } from "./AccountService";
import { join } from "path";


@Injectable()
export class AccountServiceClientStub implements OnModuleInit {
  public stub!: clientType;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m2",
        url: this.url,
        protoPath: join(__dirname, "../../../proto/mwp/m2/mwp_m2_account.proto"),
      },
    });

    this.stub = client.getService("AccountService");
  }
}

