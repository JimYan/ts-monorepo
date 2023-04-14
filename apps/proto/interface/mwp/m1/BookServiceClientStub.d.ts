import { OnModuleInit } from "@nestjs/common";
import { BookServiceClient as clientType } from "./BookService";
export declare class BookServiceClientStub implements OnModuleInit {
    stub: clientType;
    private readonly url;
    onModuleInit(): void;
}
