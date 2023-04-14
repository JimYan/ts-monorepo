/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { BookServiceClient as clientType } from "./BookService";
import { join } from "path";


@Injectable()
export class BookServiceClientStub implements OnModuleInit {
  public stub!: clientType;

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  onModuleInit() {
    const client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "mwp.m1",
        url: this.url,
        protoPath: join(__dirname, "../../../proto/mwp/m1/mwp_m1_book.proto"),
      },
    });

    this.stub = client.getService("BookService");
  }
}

