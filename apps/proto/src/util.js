"use strict";
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * @license
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.addCommonProtos = exports.loadProtosWithOptionsSync = exports.loadProtosWithOptions = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Protobuf = __importStar(require("protobufjs"));
function addIncludePathResolver(root, includePaths) {
    const originalResolvePath = root.resolvePath;
    root.resolvePath = (origin, target) => {
        if (path.isAbsolute(target)) {
            return target;
        }
        for (const directory of includePaths) {
            const fullPath = path.join(directory, target);
            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                return fullPath;
            }
            catch (err) {
                continue;
            }
        }
        process.emitWarning(`${target} not found in any of the include paths ${includePaths}`);
        return originalResolvePath(origin, target);
    };
}
function loadProtosWithOptions(filename, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const root = new Protobuf.Root();
        options = options || {};
        if (!!options.includeDirs) {
            if (!Array.isArray(options.includeDirs)) {
                return Promise.reject(new Error("The includeDirs option must be an array"));
            }
            addIncludePathResolver(root, options.includeDirs);
        }
        const loadedRoot = yield root.load(filename, options);
        loadedRoot.resolveAll();
        return loadedRoot;
    });
}
exports.loadProtosWithOptions = loadProtosWithOptions;
function loadProtosWithOptionsSync(filename, options) {
    const root = new Protobuf.Root();
    options = options || {};
    if (!!options.includeDirs) {
        if (!Array.isArray(options.includeDirs)) {
            throw new Error("The includeDirs option must be an array");
        }
        addIncludePathResolver(root, options.includeDirs);
    }
    const loadedRoot = root.loadSync(filename, options);
    loadedRoot.resolveAll();
    return loadedRoot;
}
exports.loadProtosWithOptionsSync = loadProtosWithOptionsSync;
/**
 * Load Google's well-known proto files that aren't exposed by Protobuf.js.
 */
function addCommonProtos() {
    // Protobuf.js exposes: any, duration, empty, field_mask, struct, timestamp,
    // and wrappers. compiler/plugin is excluded in Protobuf.js and here.
    // Using constant strings for compatibility with tools like Webpack
    const apiDescriptor = require("protobufjs/google/protobuf/api.json");
    const descriptorDescriptor = require("protobufjs/google/protobuf/descriptor.json");
    const sourceContextDescriptor = require("protobufjs/google/protobuf/source_context.json");
    const typeDescriptor = require("protobufjs/google/protobuf/type.json");
    Protobuf.common("api", apiDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("descriptor", descriptorDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("source_context", sourceContextDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("type", typeDescriptor.nested.google.nested.protobuf.nested);
}
exports.addCommonProtos = addCommonProtos;
