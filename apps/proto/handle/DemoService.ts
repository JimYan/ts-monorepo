/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {getServiceByPGname} from "../src/service";
import * as grpc from '@grpc/grpc-js';
import {DemoServiceClient} from "../interface/mwp/demo/DemoService";
import { join } from "path";

@Injectable()
export class DemoService implements OnModuleInit {
  public DemoServiceStub!: DemoServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  async onModuleInit() {
    let extra: any = {}
    const url: string | undefined = this.url ? this.url : await getServiceByPGname("mwp.demo");
    if(!url){
      throw new Error("get service:mwp.demo rpc url is null");
    }
    if(url && /:443$/.test(url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const DemoServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.demo",
        url: url,
        protoPath: join(__dirname, "../proto/mwp/demo/mwp_demo_main.proto"),
        ...extra
      },
    });
    this.DemoServiceStub = DemoServiceClient.getService("DemoService");
  }
}
