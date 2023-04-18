/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import * as grpc from '@grpc/grpc-js';
import {DemoServiceClient} from "../interface/mwp/demo/DemoService";
import { join } from "path";

@Injectable()
export class DemoService implements OnModuleInit {
  public DemoServiceStub!: DemoServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    let extra: any = {}
    if(this.url && /:443$/.test(this.url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const DemoServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.demo",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/demo/mwp_demo_main.proto"),
        ...extra
      },
    });
    this.DemoServiceStub = DemoServiceClient.getService("DemoService");
  }
}
