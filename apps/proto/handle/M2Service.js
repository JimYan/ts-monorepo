"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M2Service = void 0;
/* eslint-disable */
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const service_1 = require("../src/service");
const grpc = __importStar(require("@grpc/grpc-js"));
const path_1 = require("path");
let M2Service = class M2Service {
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            let extra = {};
            const url = this.url ? this.url : yield (0, service_1.getServiceByPGname)("mwp.m2");
            if (!url) {
                throw new Error("get service:mwp.m2 rpc url is null");
            }
            if (url && /:443$/.test(url)) {
                extra.credentials = grpc.credentials.createSsl();
            }
            const AccountServiceClient = microservices_1.ClientProxyFactory.create({
                transport: microservices_1.Transport.GRPC,
                options: Object.assign({ package: "mwp.m2", url: url, protoPath: (0, path_1.join)(__dirname, "../proto/mwp/m2/mwp_m2_account.proto") }, extra),
            });
            this.AccountServiceStub = AccountServiceClient.getService("AccountService");
        });
    }
};
__decorate([
    (0, common_1.Inject)("SERVICE_URI"),
    __metadata("design:type", Object)
], M2Service.prototype, "url", void 0);
M2Service = __decorate([
    (0, common_1.Injectable)()
], M2Service);
exports.M2Service = M2Service;
