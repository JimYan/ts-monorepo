import { OnModuleInit } from "@nestjs/common";
import { BookServiceClient } from "../interface/mwp/m1/BookService";
import { HeroesServiceClient } from "../interface/mwp/m1/HeroesService";
export declare class M1Service implements OnModuleInit {
    BookServiceStub: BookServiceClient;
    HeroesServiceStub: HeroesServiceClient;
    private readonly url;
    onModuleInit(): void;
}
