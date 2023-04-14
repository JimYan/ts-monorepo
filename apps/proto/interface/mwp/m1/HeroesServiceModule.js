"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HeroesServiceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroesServiceModule = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
const HeroesServiceClientStub_1 = require("./HeroesServiceClientStub");
let HeroesServiceModule = HeroesServiceModule_1 = class HeroesServiceModule {
    static forRoot(uri) {
        return {
            global: true,
            module: HeroesServiceModule_1,
            providers: [HeroesServiceClientStub_1.HeroesServiceClientStub, {
                    provide: "SERVICE_URI",
                    useValue: uri,
                }],
            exports: [HeroesServiceClientStub_1.HeroesServiceClientStub],
        };
    }
};
HeroesServiceModule = HeroesServiceModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
        controllers: [],
    })
], HeroesServiceModule);
exports.HeroesServiceModule = HeroesServiceModule;
