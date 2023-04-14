"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2Service = exports.m1 = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.m1 = {
    options: {
        package: "mwp.m2",
        url: "127.0.0.1:3003",
        protoPath: (0, path_1.join)(__dirname, "../proto/mwp/m2/mwp_m2_account.proto"),
    },
};
let M2Service = class M2Service {
    onModuleInit() {
        const client = microservices_1.ClientProxyFactory.create(Object.assign({ transport: microservices_1.Transport.GRPC }, exports.m1));
        this.accountServiceClient = client.getService("AccountService");
    }
};
M2Service = __decorate([
    (0, common_1.Injectable)()
], M2Service);
exports.M2Service = M2Service;
