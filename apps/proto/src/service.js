"use strict";
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
exports.getServiceByPGname = void 0;
const PGMAP = {
    "mwp.m1": {
        dev: "127.0.0.1:3002",
        prod: "mwp-rpc-ghri5ivvvq-df.a.run.app:443",
    },
    "mwp.m2": {
        dev: "127.0.0.1:3003",
        prod: "mwp-grpc-2-ghri5ivvvq-df.a.run.app:443",
    },
};
const getServiceByPGname = (packageName) => __awaiter(void 0, void 0, void 0, function* () {
    if (PGMAP[packageName] === undefined) {
        return undefined;
    }
    const env = process.env.NODE_ENV || "dev";
    return PGMAP[packageName][env] || undefined;
});
exports.getServiceByPGname = getServiceByPGname;
