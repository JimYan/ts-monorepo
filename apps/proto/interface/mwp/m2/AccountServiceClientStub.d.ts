import { OnModuleInit } from "@nestjs/common";
import { AccountServiceClient as clientType } from "./AccountService";
export declare class AccountServiceClientStub implements OnModuleInit {
    stub: clientType;
    private readonly url;
    onModuleInit(): void;
}
