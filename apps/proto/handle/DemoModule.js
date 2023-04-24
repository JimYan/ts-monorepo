"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DemoModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoModule = void 0;
/* eslint-disable */
const common_1 = require("@nestjs/common");
const DemoService_1 = require("./DemoService");
let DemoModule = DemoModule_1 = class DemoModule {
    static forRoot(uri = '') {
        return {
            global: true,
            module: DemoModule_1,
            providers: [DemoService_1.DemoService, {
                    provide: "SERVICE_URI",
                    useValue: uri,
                }],
            exports: [DemoService_1.DemoService],
        };
    }
};
DemoModule = DemoModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
        controllers: [],
    })
], DemoModule);
exports.DemoModule = DemoModule;
