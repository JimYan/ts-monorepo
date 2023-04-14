"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M1Service = exports.m1 = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.m1 = {
    options: {
        package: "mwp.m1",
        url: "127.0.0.1:3002",
        protoPath: (0, path_1.join)(__dirname, "../proto/mwp/m1/mwp_m1_main.proto"),
    },
};
let M1Service = class M1Service {
    onModuleInit() {
        const client = microservices_1.ClientProxyFactory.create(Object.assign({ transport: microservices_1.Transport.GRPC }, exports.m1));
        this.bookServiceClient = client.getService("BookService");
        this.heroesServiceClient = client.getService("HeroesService");
    }
};
M1Service = __decorate([
    (0, common_1.Injectable)()
], M1Service);
exports.M1Service = M1Service;
