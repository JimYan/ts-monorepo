/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {AccountServiceClient} from "../interface/mwp/m2/AccountService";
import { join } from "path";

@Injectable()
export class M2Service implements OnModuleInit {
  public AccountServiceStub!: AccountServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    const AccountServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m2",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m2/mwp_m2_account.proto"),
      },
    });
    this.AccountServiceStub = AccountServiceClient.getService("AccountService");
  }
}
