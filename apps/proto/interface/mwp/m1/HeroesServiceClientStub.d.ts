import { OnModuleInit } from "@nestjs/common";
import { HeroesServiceClient as clientType } from "./HeroesService";
export declare class HeroesServiceClientStub implements OnModuleInit {
    stub: clientType;
    private readonly url;
    onModuleInit(): void;
}
