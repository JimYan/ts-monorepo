/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { HeroesServiceClient as clientType } from "./HeroesService";
import { join } from "path";


@Injectable()
export class HeroesServiceClientStub implements OnModuleInit {
  public stub!: clientType;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../../../proto/mwp/m1/mwp_m1_hero.proto"),
      },
    });

    this.stub = client.getService("HeroesService");
  }
}

