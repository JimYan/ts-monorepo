/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {DemoServiceClient} from "../interface/mwp/demo/DemoService";
import { join } from "path";

@Injectable()
export class DemoService implements OnModuleInit {
  public DemoServiceStub!: DemoServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    const DemoServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.demo",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/demo/mwp_demo_main.proto"),
      },
    });
    this.DemoServiceStub = DemoServiceClient.getService("DemoService");
  }
}
