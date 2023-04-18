/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
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
    const BookServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_book.proto"),
      },
    });
const HeroesServiceClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../proto/mwp/m1/mwp_m1_hero.proto"),
      },
    });
    this.BookServiceStub = BookServiceClient.getService("BookService");
this.HeroesServiceStub = HeroesServiceClient.getService("HeroesService");
  }
}
