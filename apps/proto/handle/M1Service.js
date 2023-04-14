"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M1Service = void 0;
/* eslint-disable */
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
let M1Service = class M1Service {
    onModuleInit() {
        const BookServiceClient = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.GRPC,
            options: {
                package: "mwp.m1",
                url: this.url,
                protoPath: (0, path_1.join)(__dirname, "../proto/mwp/m1/mwp_m1_book.proto"),
            },
        });
        const HeroesServiceClient = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.GRPC,
            options: {
                package: "mwp.m1",
                url: this.url,
                protoPath: (0, path_1.join)(__dirname, "../proto/mwp/m1/mwp_m1_hero.proto"),
            },
        });
        this.BookServiceStub = BookServiceClient.getService("BookService");
        this.HeroesServiceStub = HeroesServiceClient.getService("HeroesService");
    }
};
__decorate([
    (0, common_1.Inject)("SERVICE_URI"),
    __metadata("design:type", Object)
], M1Service.prototype, "url", void 0);
M1Service = __decorate([
    (0, common_1.Injectable)()
], M1Service);
exports.M1Service = M1Service;
