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
exports.HeroBo__OutputDto = exports.HeroBoDto = void 0;
// Original file: proto/mwp/m1/mwp_m1_hero.proto
/* eslint-disable */
const swagger_1 = require("@nestjs/swagger");
const ExtroBo_1 = require("../../mwp/m1/ExtroBo");
class HeroBoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], HeroBoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HeroBoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ExtroBo_1.ExtroBo__OutputDto }),
    __metadata("design:type", Object)
], HeroBoDto.prototype, "extro", void 0);
exports.HeroBoDto = HeroBoDto;
class HeroBo__OutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], HeroBo__OutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], HeroBo__OutputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ExtroBo_1.ExtroBo__OutputDto }),
    __metadata("design:type", Object)
], HeroBo__OutputDto.prototype, "extro", void 0);
exports.HeroBo__OutputDto = HeroBo__OutputDto;
