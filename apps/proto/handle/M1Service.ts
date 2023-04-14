import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { BookServiceClient } from "../interface/mwp/m1/BookService";
import { HeroesServiceClient } from "../interface/mwp/m1/HeroesService";
import { join } from "path";

export const m1 = {
  options: {
    package: "mwp.m1",
    url: "127.0.0.1:3002",
    protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_main.proto"),
  },
};

@Injectable()
export class M1Service implements OnModuleInit {
  public bookServiceClient!: BookServiceClient;

  public heroesServiceClient!: HeroesServiceClient;

  onModuleInit() {
    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      ...m1,
    });

    this.bookServiceClient = client.getService("BookService");
    this.heroesServiceClient = client.getService("HeroesService");
  }
}
