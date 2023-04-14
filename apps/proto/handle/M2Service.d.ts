import { OnModuleInit } from "@nestjs/common";
import { AccountServiceClient } from "../interface/mwp/m2/AccountService";
export declare class M2Service implements OnModuleInit {
    AccountServiceStub: AccountServiceClient;
    private readonly url;
    onModuleInit(): void;
}
