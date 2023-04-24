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
exports.FindAccountResp__OutputDto = exports.FindAccountRespDto = void 0;
// Original file: proto/mwp/demo/mwp_demo_main.proto
/* eslint-disable */
const swagger_1 = require("@nestjs/swagger");
const AccountBo_1 = require("../../mwp/demo/AccountBo");
class FindAccountRespDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAccountRespDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAccountRespDto.prototype, "msg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => AccountBo_1.AccountBo__OutputDto }),
    __metadata("design:type", Object)
], FindAccountRespDto.prototype, "list", void 0);
exports.FindAccountRespDto = FindAccountRespDto;
class FindAccountResp__OutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindAccountResp__OutputDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAccountResp__OutputDto.prototype, "msg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => AccountBo_1.AccountBo__OutputDto }),
    __metadata("design:type", Object)
], FindAccountResp__OutputDto.prototype, "list", void 0);
exports.FindAccountResp__OutputDto = FindAccountResp__OutputDto;
