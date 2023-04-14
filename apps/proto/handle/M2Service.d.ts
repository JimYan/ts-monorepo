import { OnModuleInit } from "@nestjs/common";
import { AccountServiceClient } from "../interface/mwp/m2/AccountService";
export declare const m1: {
    options: {
        package: string;
        url: string;
        protoPath: string;
    };
};
export declare class M2Service implements OnModuleInit {
    accountServiceClient: AccountServiceClient;
    onModuleInit(): void;
}
