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
exports.FindBookResp__OutputDto = exports.FindBookRespDto = void 0;
// Original file: proto/mwp/m1/mwp_m1_book.proto
/* eslint-disable */
const swagger_1 = require("@nestjs/swagger");
const BookBo_1 = require("../../mwp/m1/BookBo");
class FindBookRespDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindBookRespDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindBookRespDto.prototype, "msg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BookBo_1.BookBo__OutputDto] }),
    __metadata("design:type", Array)
], FindBookRespDto.prototype, "list", void 0);
exports.FindBookRespDto = FindBookRespDto;
class FindBookResp__OutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FindBookResp__OutputDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindBookResp__OutputDto.prototype, "msg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BookBo_1.BookBo__OutputDto] }),
    __metadata("design:type", Array)
], FindBookResp__OutputDto.prototype, "list", void 0);
exports.FindBookResp__OutputDto = FindBookResp__OutputDto;
