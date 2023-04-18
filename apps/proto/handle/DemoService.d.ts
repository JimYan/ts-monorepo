import { OnModuleInit } from "@nestjs/common";
import { DemoServiceClient } from "../interface/mwp/demo/DemoService";
export declare class DemoService implements OnModuleInit {
    DemoServiceStub: DemoServiceClient;
    private readonly url;
    onModuleInit(): void;
}
