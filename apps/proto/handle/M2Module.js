"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var M2Module_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2Module = void 0;
const common_1 = require("@nestjs/common");
const M2Service_1 = require("../handle/M2Service");
let M2Module = M2Module_1 = class M2Module {
    static forRoot() {
        return {
            global: true,
            module: M2Module_1,
            providers: [M2Service_1.M2Service],
            exports: [M2Service_1.M2Service],
        };
    }
};
M2Module = M2Module_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
        controllers: [],
    })
], M2Module);
exports.M2Module = M2Module;
