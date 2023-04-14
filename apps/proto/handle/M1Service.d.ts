import { OnModuleInit } from "@nestjs/common";
import { BookServiceClient } from "../interface/mwp/m1/BookService";
import { HeroesServiceClient } from "../interface/mwp/m1/HeroesService";
export declare const m1: {
    options: {
        package: string;
        url: string;
        protoPath: string;
    };
};
export declare class M1Service implements OnModuleInit {
    bookServiceClient: BookServiceClient;
    heroesServiceClient: HeroesServiceClient;
    onModuleInit(): void;
}
