/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import * as grpc from '@grpc/grpc-js';
import {BookServiceClient} from "../interface/mwp/m1/BookService";
import {HeroesServiceClient} from "../interface/mwp/m1/HeroesService";
import { join } from "path";

@Injectable()
export class M1Service implements OnModuleInit {
  public BookServiceStub!: BookServiceClient;
public HeroesServiceStub!: HeroesServiceClient;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    let extra: any = {}
    if(this.url && /:443$/.test(this.url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const BookServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_book.proto"),
        ...extra
      },
    });
const HeroesServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_hero.proto"),
        ...extra
      },
    });
    this.BookServiceStub = BookServiceClient.getService("BookService");
this.HeroesServiceStub = HeroesServiceClient.getService("HeroesService");
  }
}
