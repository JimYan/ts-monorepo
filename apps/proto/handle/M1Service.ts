/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {getServiceByPGname} from "../src/service";
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

  async onModuleInit() {
    let extra: any = {}
    const url: string | undefined = this.url ? this.url : await getServiceByPGname("mwp.m1");
    if(!url){
      throw new Error("get service:mwp.m1 rpc url is null");
    }
    if(url && /:443$/.test(url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    const BookServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_book.proto"),
        ...extra
      },
    });
const HeroesServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_hero.proto"),
        ...extra
      },
    });
    this.BookServiceStub = BookServiceClient.getService("BookService");
this.HeroesServiceStub = HeroesServiceClient.getService("HeroesService");
  }
}
