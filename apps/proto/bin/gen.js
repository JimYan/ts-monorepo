#!/usr/bin/env node
"use strict";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-template */
/* eslint-disable padding-line-between-statements */
/* eslint-disable */
/**
 * @license
 * Copyright 2020 gRPC authors.
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Protobuf = __importStar(require("protobufjs"));
const yargs = __importStar(require("yargs"));
const camelCase = require("lodash.camelcase");
const util_1 = require("../src/util");
let packages = {};
let moduleName = "";
const serviceList = [];
const isDtoReg = /Dto(\s\|\snull)?$/;
const templateStr = "%s";
const useNameFmter = ({ outputTemplate, inputTemplate }) => {
    if (outputTemplate === inputTemplate) {
        throw new Error("inputTemplate and outputTemplate must differ");
    }
    return {
        outputName: (n) => outputTemplate.replace(templateStr, n),
        inputName: (n) => inputTemplate.replace(templateStr, n),
    };
};
class TextFormatter {
    constructor() {
        this.indentText = "  ";
        this.indentValue = 0;
        this.textParts = [];
    }
    indent() {
        this.indentValue += 1;
    }
    unindent() {
        this.indentValue -= 1;
    }
    writeLine(line) {
        for (let i = 0; i < this.indentValue; i += 1) {
            this.textParts.push(this.indentText);
        }
        this.textParts.push(line);
        this.textParts.push("\n");
    }
    getFullText() {
        return this.textParts.join("");
    }
}
// GENERATOR UTILITY FUNCTIONS
function compareName(x, y) {
    if (x.name < y.name) {
        return -1;
    }
    else if (x.name > y.name) {
        return 1;
    }
    else {
        return 0;
    }
}
function isNamespaceBase(obj) {
    return Array.isArray(obj.nestedArray);
}
function stripLeadingPeriod(name) {
    return name.startsWith(".") ? name.substring(1) : name;
}
function getImportPath(to) {
    /* If the thing we are importing is defined in a message, it is generated in
     * the same file as that message. */
    if (to.parent instanceof Protobuf.Type) {
        return getImportPath(to.parent);
    }
    return stripLeadingPeriod(to.fullName).replace(/\./g, "/");
}
function getPath(to) {
    return stripLeadingPeriod(to.fullName).replace(/\./g, "/") + ".ts";
}
function getPathToRoot(from) {
    const depth = stripLeadingPeriod(from.fullName).split(".").length - 1;
    if (depth === 0) {
        return "./";
    }
    let path = "";
    for (let i = 0; i < depth; i++) {
        path += "../";
    }
    return path;
}
function getRelativeImportPath(from, to) {
    return getPathToRoot(from) + getImportPath(to);
}
function getTypeInterfaceName(type) {
    return type.fullName.replace(/\./g, "_");
}
function getImportLine(dependency, from, options) {
    const filePath = from === undefined
        ? "./" + getImportPath(dependency)
        : getRelativeImportPath(from, dependency);
    const { outputName, inputName } = useNameFmter(options);
    const typeInterfaceName = getTypeInterfaceName(dependency);
    let importedTypes;
    /* If the dependency is defined within a message, it will be generated in that
     * message's file and exported using its typeInterfaceName. */
    if (dependency.parent instanceof Protobuf.Type) {
        if (dependency instanceof Protobuf.Type ||
            dependency instanceof Protobuf.Enum) {
            importedTypes = `${inputName(typeInterfaceName)}, ${outputName(typeInterfaceName)}`;
        }
        else if (dependency instanceof Protobuf.Service) {
            importedTypes = `${typeInterfaceName}Client, ${typeInterfaceName}Definition`;
        }
        else {
            throw new Error("Invalid object passed to getImportLine");
        }
    }
    else {
        if (dependency instanceof Protobuf.Type ||
            dependency instanceof Protobuf.Enum) {
            importedTypes = `${inputName(dependency.name)} as ${inputName(typeInterfaceName)}, ${outputName(dependency.name)} as ${outputName(typeInterfaceName)}`;
        }
        else if (dependency instanceof Protobuf.Service) {
            importedTypes = `${dependency.name}Client as ${typeInterfaceName}Client, ${dependency.name}Definition as ${typeInterfaceName}Definition`;
        }
        else {
            throw new Error("Invalid object passed to getImportLine");
        }
    }
    return `import type { ${importedTypes} } from '${filePath}';`;
}
function getImportClassLine(dependency, from, options) {
    const filePath = from === undefined
        ? "./" + getImportPath(dependency)
        : getRelativeImportPath(from, dependency);
    const { outputName, inputName } = useNameFmter(options);
    const typeInterfaceName = getTypeInterfaceName(dependency);
    let importedTypes;
    /* If the dependency is defined within a message, it will be generated in that
     * message's file and exported using its typeInterfaceName. */
    if (dependency.parent instanceof Protobuf.Type) {
        if (dependency instanceof Protobuf.Type ||
            dependency instanceof Protobuf.Enum) {
            importedTypes = `${inputName(typeInterfaceName)}, ${outputName(typeInterfaceName)}`;
        }
        else if (dependency instanceof Protobuf.Service) {
            importedTypes = `${typeInterfaceName}Client, ${typeInterfaceName}Definition`;
        }
        else {
            throw new Error("Invalid object passed to getImportLine");
        }
    }
    else {
        if (dependency instanceof Protobuf.Type ||
            dependency instanceof Protobuf.Enum) {
            importedTypes = `${inputName(dependency.name)}Dto as ${inputName(typeInterfaceName)}Dto,${outputName(dependency.name)}Dto as ${outputName(typeInterfaceName)}Dto`;
        }
        else if (dependency instanceof Protobuf.Service) {
            importedTypes = `${dependency.name}Client as ${typeInterfaceName}Client, ${dependency.name}Definition as ${typeInterfaceName}Definition`;
        }
        else {
            throw new Error("Invalid object passed to getImportLine");
        }
    }
    return `import { ${importedTypes} } from '${filePath}';`;
}
function getChildMessagesAndEnums(namespace) {
    const messageList = [];
    for (const nested of namespace.nestedArray) {
        if (nested instanceof Protobuf.Type || nested instanceof Protobuf.Enum) {
            messageList.push(nested);
        }
        if (isNamespaceBase(nested)) {
            messageList.push(...getChildMessagesAndEnums(nested));
        }
    }
    return messageList;
}
function formatComment(formatter, comment, options) {
    if (!comment && !(options === null || options === void 0 ? void 0 : options.deprecated)) {
        return;
    }
    formatter.writeLine("/**");
    if (comment) {
        for (const line of comment.split("\n")) {
            formatter.writeLine(` * ${line.replace(/\*\//g, "* /")}`);
        }
    }
    if (options === null || options === void 0 ? void 0 : options.deprecated) {
        formatter.writeLine(" * @deprecated");
    }
    formatter.writeLine(" */");
}
const typeBrandHint = `This field is a type brand and is not populated at runtime. Instances of this type should be created using type assertions.
https://github.com/grpc/grpc-node/pull/2281`;
function formatTypeBrand(formatter, messageType) {
    formatComment(formatter, typeBrandHint);
    formatter.writeLine(`__type: '${messageType.fullName}'`);
}
// GENERATOR FUNCTIONS
function getTypeNamePermissive(fieldType, resolvedType, repeated, map, options) {
    const { inputName } = useNameFmter(options);
    switch (fieldType) {
        case "double":
        case "float":
            return "number | string";
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            return "number";
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            return "number | string | Long";
        case "bool":
            return "boolean";
        case "string":
            return "string";
        case "bytes":
            return "Buffer | Uint8Array | string";
        default:
            if (resolvedType === null) {
                throw new Error("Found field with no usable type");
            }
            const typeInterfaceName = getTypeInterfaceName(resolvedType);
            if (resolvedType instanceof Protobuf.Type) {
                if (repeated || map) {
                    return inputName(typeInterfaceName);
                }
                else {
                    return `${inputName(typeInterfaceName)} | null`;
                }
            }
            else {
                // Enum
                return inputName(typeInterfaceName);
            }
    }
}
function getFieldTypePermissive(field, options) {
    const valueType = getTypeNamePermissive(field.type, field.resolvedType, field.repeated, field.map, options);
    if (field instanceof Protobuf.MapField) {
        const keyType = field.keyType === "string" ? "string" : "number";
        return `{[key: ${keyType}]: ${valueType}}`;
    }
    else {
        return valueType;
    }
}
function generatePermissiveMessageInterface(formatter, messageType, options, nameOverride) {
    const { inputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, messageType.comment, messageType.options);
    }
    if (messageType.fullName === ".google.protobuf.Any") {
        /* This describes the behavior of the Protobuf.js Any wrapper fromObject
         * replacement function */
        formatter.writeLine(`export type ${inputName("Any")} = AnyExtension | {`);
        formatter.writeLine("  type_url: string;");
        formatter.writeLine("  value: Buffer | Uint8Array | string;");
        formatter.writeLine("}");
        return;
    }
    formatter.writeLine(`export interface ${inputName(nameOverride !== null && nameOverride !== void 0 ? nameOverride : messageType.name)} {`);
    formatter.indent();
    for (const field of messageType.fieldsArray) {
        const repeatedString = field.repeated ? "[]" : "";
        const type = getFieldTypePermissive(field, options);
        if (options.includeComments) {
            formatComment(formatter, field.comment, field.options);
        }
        formatter.writeLine(`'${field.name}'?: (${type})${repeatedString};`);
    }
    for (const oneof of messageType.oneofsArray) {
        const typeString = oneof.fieldsArray
            .map((field) => `"${field.name}"`)
            .join("|");
        if (options.includeComments) {
            formatComment(formatter, oneof.comment, oneof.options);
        }
        formatter.writeLine(`'${oneof.name}'?: ${typeString};`);
    }
    if (options.inputBranded) {
        formatTypeBrand(formatter, messageType);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function getTypeNameRestricted(fieldType, resolvedType, repeated, map, options, isDto = false) {
    const { outputName } = useNameFmter(options);
    switch (fieldType) {
        case "double":
        case "float":
            if (options.json) {
                return "number | string";
            }
            else {
                return "number";
            }
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            return "number";
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            if (options.longs === Number) {
                return "number";
            }
            else if (options.longs === String) {
                return "string";
            }
            else {
                return "Long";
            }
        case "bool":
            return "boolean";
        case "string":
            return "string";
        case "bytes":
            if (options.bytes === Array) {
                return "Uint8Array";
            }
            else if (options.bytes === String) {
                return "string";
            }
            else {
                return "Buffer";
            }
        default:
            if (resolvedType === null) {
                throw new Error("Found field with no usable type");
            }
            const typeInterfaceName = getTypeInterfaceName(resolvedType);
            if (resolvedType instanceof Protobuf.Type) {
                /* null is only used to represent absent message values if the defaults
                 * option is set, and only for non-repeated, non-map fields. */
                if (options.defaults && !repeated && !map) {
                    return `${outputName(typeInterfaceName)}${isDto ? "Dto" : ""} | null`;
                }
                else {
                    return `${outputName(typeInterfaceName)}${isDto ? "Dto" : ""}`;
                }
            }
            else {
                // Enum
                return outputName(typeInterfaceName) + isDto ? "Dto" : "";
            }
    }
}
function getFieldTypeRestricted(field, options, isDto = false) {
    const valueType = getTypeNameRestricted(field.type, field.resolvedType, field.repeated, field.map, options, isDto);
    if (field instanceof Protobuf.MapField) {
        const keyType = field.keyType === "string" ? "string" : "number";
        return `{[key: ${keyType}]: ${valueType}}`;
    }
    else {
        return valueType;
    }
}
function generateRestrictedMessageInterface(formatter, messageType, options, nameOverride) {
    var _a, _b, _c;
    const { outputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, messageType.comment, messageType.options);
    }
    if (messageType.fullName === ".google.protobuf.Any" && options.json) {
        /* This describes the behavior of the Protobuf.js Any wrapper toObject
         * replacement function */
        let optionalString = options.defaults ? "" : "?";
        formatter.writeLine(`export type ${outputName("Any")} = AnyExtension | {`);
        formatter.writeLine(`  type_url${optionalString}: string;`);
        formatter.writeLine(`  value${optionalString}: ${getTypeNameRestricted("bytes", null, false, false, options)};`);
        formatter.writeLine("}");
        return;
    }
    formatter.writeLine(`export interface ${outputName(nameOverride !== null && nameOverride !== void 0 ? nameOverride : messageType.name)} {`);
    formatter.writeLine(`/*test*/`);
    formatter.indent();
    for (const field of messageType.fieldsArray) {
        let fieldGuaranteed;
        if (field.partOf) {
            // The field is not guaranteed populated if it is part of a oneof
            fieldGuaranteed = false;
        }
        else if (field.repeated) {
            fieldGuaranteed = (_a = (options.defaults || options.arrays)) !== null && _a !== void 0 ? _a : false;
        }
        else if (field.map) {
            fieldGuaranteed = (_b = (options.defaults || options.objects)) !== null && _b !== void 0 ? _b : false;
        }
        else {
            fieldGuaranteed = (_c = options.defaults) !== null && _c !== void 0 ? _c : false;
        }
        const optionalString = fieldGuaranteed ? "" : "?";
        const repeatedString = field.repeated ? "[]" : "";
        const type = getFieldTypeRestricted(field, options);
        if (options.includeComments) {
            formatComment(formatter, field.comment, field.options);
        }
        formatter.writeLine(`'${field.name}'${optionalString}: (${type})${repeatedString};`);
    }
    if (options.oneofs) {
        for (const oneof of messageType.oneofsArray) {
            const typeString = oneof.fieldsArray
                .map((field) => `"${field.name}"`)
                .join("|");
            if (options.includeComments) {
                formatComment(formatter, oneof.comment, oneof.options);
            }
            formatter.writeLine(`'${oneof.name}': ${typeString};`);
        }
    }
    if (options.outputBranded) {
        formatTypeBrand(formatter, messageType);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateDtoMessageInterface(formatter, messageType, options, nameOverride) {
    var _a, _b, _c;
    const { outputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, messageType.comment, messageType.options);
    }
    if (messageType.fullName === ".google.protobuf.Any" && options.json) {
        /* This describes the behavior of the Protobuf.js Any wrapper toObject
         * replacement function */
        let optionalString = options.defaults ? "" : "?";
        formatter.writeLine(`export type ${outputName("Any")} = AnyExtension | {`);
        formatter.writeLine(`  type_url${optionalString}: string;`);
        formatter.writeLine(`  value${optionalString}: ${getTypeNameRestricted("bytes", null, false, false, options)};`);
        formatter.writeLine("}");
        return;
    }
    formatter.writeLine(`export class ${messageType.name}Dto {`);
    // formatter.writeLine(`/*dto*/`);
    formatter.indent();
    for (const field of messageType.fieldsArray) {
        let fieldGuaranteed;
        if (field.partOf) {
            // The field is not guaranteed populated if it is part of a oneof
            fieldGuaranteed = false;
        }
        else if (field.repeated) {
            fieldGuaranteed = (_a = (options.defaults || options.arrays)) !== null && _a !== void 0 ? _a : false;
        }
        else if (field.map) {
            fieldGuaranteed = (_b = (options.defaults || options.objects)) !== null && _b !== void 0 ? _b : false;
        }
        else {
            fieldGuaranteed = (_c = options.defaults) !== null && _c !== void 0 ? _c : false;
        }
        const optionalString = fieldGuaranteed ? "" : "?";
        const repeatedString = field.repeated ? "[]" : "";
        const type = getFieldTypeRestricted(field, options, true);
        if (options.includeComments) {
            formatComment(formatter, field.comment, field.options);
        }
        // console.log(type);
        if (field.repeated) {
            formatter.writeLine(`@ApiProperty({type: [${type.replace(/\s\|\snull$/, "")}]})`);
        }
        else if (isDtoReg.test(type)) {
            formatter.writeLine(`@ApiProperty({type: ()=>${type.replace(/\s\|\snull$/, "")}})`);
        }
        else {
            formatter.writeLine(`@ApiProperty()`);
        }
        formatter.writeLine(`'${field.name}'${optionalString}: (${type})${repeatedString};`);
    }
    if (options.oneofs) {
        for (const oneof of messageType.oneofsArray) {
            const typeString = oneof.fieldsArray
                .map((field) => `"${field.name}"`)
                .join("|");
            if (options.includeComments) {
                formatComment(formatter, oneof.comment, oneof.options);
            }
            if (isDtoReg.test(typeString)) {
                formatter.writeLine(`@ApiProperty({type: ()=>${typeString.replace(/\s|\snull$/, "")}})`);
            }
            else {
                formatter.writeLine(`@ApiProperty()`);
            }
            // formatter.writeLine(`@ApiProperty({ type: () => ${typeString} })`);
            //@ApiProperty({ type: () => _mwp_m1_HeroBo__OutputDto })
            formatter.writeLine(`'${oneof.name}': ${typeString};`);
        }
    }
    if (options.outputBranded) {
        formatTypeBrand(formatter, messageType);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateDtoRestrictedMessageInterface(formatter, messageType, options, nameOverride) {
    var _a, _b, _c;
    const { outputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, messageType.comment, messageType.options);
    }
    if (messageType.fullName === ".google.protobuf.Any" && options.json) {
        /* This describes the behavior of the Protobuf.js Any wrapper toObject
         * replacement function */
        let optionalString = options.defaults ? "" : "?";
        formatter.writeLine(`export type ${outputName("Any")} = AnyExtension | {`);
        formatter.writeLine(`  type_url${optionalString}: string;`);
        formatter.writeLine(`  value${optionalString}: ${getTypeNameRestricted("bytes", null, false, false, options)};`);
        formatter.writeLine("}");
        return;
    }
    formatter.writeLine(`export class ${outputName(nameOverride !== null && nameOverride !== void 0 ? nameOverride : messageType.name)}Dto {`);
    // formatter.writeLine(`/*dto*/`);
    formatter.indent();
    for (const field of messageType.fieldsArray) {
        let fieldGuaranteed;
        if (field.partOf) {
            // The field is not guaranteed populated if it is part of a oneof
            fieldGuaranteed = false;
        }
        else if (field.repeated) {
            fieldGuaranteed = (_a = (options.defaults || options.arrays)) !== null && _a !== void 0 ? _a : false;
        }
        else if (field.map) {
            fieldGuaranteed = (_b = (options.defaults || options.objects)) !== null && _b !== void 0 ? _b : false;
        }
        else {
            fieldGuaranteed = (_c = options.defaults) !== null && _c !== void 0 ? _c : false;
        }
        const optionalString = fieldGuaranteed ? "" : "?";
        const repeatedString = field.repeated ? "[]" : "";
        const type = getFieldTypeRestricted(field, options, true);
        if (options.includeComments) {
            formatComment(formatter, field.comment, field.options);
        }
        // formatter.writeLine(`@ApiProperty()`);
        if (field.repeated) {
            formatter.writeLine(`@ApiProperty({type: [${type.replace(/\s\|\snull$/, "")}]})`);
        }
        else if (isDtoReg.test(type)) {
            formatter.writeLine(`@ApiProperty({type: ()=>${type.replace(/\s\|\snull$/, "")}})`);
        }
        else {
            formatter.writeLine(`@ApiProperty()`);
        }
        formatter.writeLine(`'${field.name}'${optionalString}: (${type})${repeatedString};`);
    }
    if (options.oneofs) {
        for (const oneof of messageType.oneofsArray) {
            const typeString = oneof.fieldsArray
                .map((field) => `"${field.name}"`)
                .join("|");
            if (options.includeComments) {
                formatComment(formatter, oneof.comment, oneof.options);
            }
            if (isDtoReg.test(typeString)) {
                formatter.writeLine(`@ApiProperty({type: ()=>${typeString.replace(/\s\|\snull$/, "")}})`);
            }
            else {
                formatter.writeLine(`@ApiProperty()`);
            }
            // formatter.writeLine(`@ApiProperty()`);
            formatter.writeLine(`'${oneof.name}': ${typeString};`);
        }
    }
    if (options.outputBranded) {
        formatTypeBrand(formatter, messageType);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateMessageInterfaces(formatter, messageType, options) {
    var _a, _b;
    let usesLong = false;
    let seenDeps = new Set();
    const childTypes = getChildMessagesAndEnums(messageType);
    formatter.writeLine(`// Original file: ${(_b = ((_a = messageType.filename) !== null && _a !== void 0 ? _a : "null")) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, "/")}`);
    formatter.writeLine("/* eslint-disable */");
    formatter.writeLine(`import {ApiProperty} from '@nestjs/swagger';`);
    formatter.writeLine("");
    const isLongField = (field) => ["int64", "uint64", "sint64", "fixed64", "sfixed64"].includes(field.type);
    messageType.fieldsArray.sort((fieldA, fieldB) => fieldA.id - fieldB.id);
    for (const field of messageType.fieldsArray) {
        if (field.resolvedType && childTypes.indexOf(field.resolvedType) < 0) {
            const dependency = field.resolvedType;
            if (seenDeps.has(dependency.fullName)) {
                continue;
            }
            seenDeps.add(dependency.fullName);
            formatter.writeLine(getImportLine(dependency, messageType, options));
            formatter.writeLine(getImportClassLine(dependency, messageType, options));
        }
        if (isLongField(field)) {
            usesLong = true;
        }
    }
    for (const childType of childTypes) {
        if (childType instanceof Protobuf.Type) {
            for (const field of childType.fieldsArray) {
                if (field.resolvedType && childTypes.indexOf(field.resolvedType) < 0) {
                    const dependency = field.resolvedType;
                    if (seenDeps.has(dependency.fullName)) {
                        continue;
                    }
                    seenDeps.add(dependency.fullName);
                    formatter.writeLine(getImportLine(dependency, messageType, options));
                }
                if (isLongField(field)) {
                    usesLong = true;
                }
            }
        }
    }
    if (usesLong) {
        formatter.writeLine("import type { Long } from '@grpc/proto-loader';");
    }
    if (messageType.fullName === ".google.protobuf.Any") {
        formatter.writeLine("import type { AnyExtension } from '@grpc/proto-loader';");
    }
    formatter.writeLine("");
    for (const childType of childTypes.sort(compareName)) {
        const nameOverride = getTypeInterfaceName(childType);
        if (childType instanceof Protobuf.Type) {
            generatePermissiveMessageInterface(formatter, childType, options, nameOverride);
            formatter.writeLine("");
            generateRestrictedMessageInterface(formatter, childType, options, nameOverride);
            generateDtoMessageInterface(formatter, childType, options, nameOverride);
            formatter.writeLine("");
            generateDtoRestrictedMessageInterface(formatter, childType, options, nameOverride);
        }
        else {
            generateEnumInterface(formatter, childType, options, nameOverride);
        }
        formatter.writeLine("");
    }
    generatePermissiveMessageInterface(formatter, messageType, options);
    formatter.writeLine("");
    generateRestrictedMessageInterface(formatter, messageType, options);
    formatter.writeLine("");
    formatter.writeLine("");
    generateDtoMessageInterface(formatter, messageType, options);
    generateDtoRestrictedMessageInterface(formatter, messageType, options);
}
function generateEnumInterface(formatter, enumType, options, nameOverride) {
    var _a, _b, _c;
    const { inputName, outputName } = useNameFmter(options);
    const name = nameOverride !== null && nameOverride !== void 0 ? nameOverride : enumType.name;
    formatter.writeLine(`// Original file: ${(_b = ((_a = enumType.filename) !== null && _a !== void 0 ? _a : "null")) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, "/")}`);
    formatter.writeLine("/* eslint-disable */");
    formatter.writeLine("");
    if (options.includeComments) {
        formatComment(formatter, enumType.comment, enumType.options);
    }
    formatter.writeLine(`export const ${name} = {`);
    formatter.indent();
    for (const key of Object.keys(enumType.values)) {
        if (options.includeComments) {
            formatComment(formatter, enumType.comments[key], ((_c = enumType.valuesOptions) !== null && _c !== void 0 ? _c : {})[key]);
        }
        formatter.writeLine(`${key}: ${options.enums == String ? `'${key}'` : enumType.values[key]},`);
    }
    formatter.unindent();
    formatter.writeLine("} as const;");
    // Permissive Type
    formatter.writeLine("");
    if (options.includeComments) {
        formatComment(formatter, enumType.comment, enumType.options);
    }
    formatter.writeLine(`export type ${inputName(name)} =`);
    formatter.indent();
    for (const key of Object.keys(enumType.values)) {
        if (options.includeComments) {
            formatComment(formatter, enumType.comments[key]);
        }
        formatter.writeLine(`| '${key}'`);
        formatter.writeLine(`| ${enumType.values[key]}`);
    }
    formatter.unindent();
    // Restrictive Type
    formatter.writeLine("");
    if (options.includeComments) {
        formatComment(formatter, enumType.comment, enumType.options);
    }
    formatter.writeLine(`export type ${outputName(name)} = typeof ${name}[keyof typeof ${name}]`);
}
/**
 * This is a list of methods that are exist in the generic Client class in the
 * gRPC libraries. TypeScript has a problem with methods in subclasses with the
 * same names as methods in the superclass, but with mismatched APIs. So, we
 * avoid generating methods with these names in the service client interfaces.
 * We always generate two service client methods per service method: one camel
 * cased, and one with the original casing. So we will still generate one
 * service client method for any conflicting name.
 *
 * Technically, at runtime conflicting name in the service client method
 * actually shadows the original method, but TypeScript does not have a good
 * way to represent that. So this change is not 100% accurate, but it gets the
 * generated code to compile.
 *
 * This is just a list of the methods in the Client class definitions in
 * grpc@1.24.11 and @grpc/grpc-js@1.4.0.
 */
const CLIENT_RESERVED_METHOD_NAMES = new Set([
    "close",
    "getChannel",
    "waitForReady",
    "makeUnaryRequest",
    "makeClientStreamRequest",
    "makeServerStreamRequest",
    "makeBidiStreamRequest",
    "resolveCallInterceptors",
    /* These methods are private, but TypeScript is not happy with overriding even
     * private methods with mismatched APIs. */
    "checkOptionalUnaryResponseArguments",
    "checkMetadataAndOptions",
]);
function genNestModuleAndService(packages) {
    Object.keys(packages).forEach((pgname) => {
        genNestModule(pgname);
        const servicelist = packages[pgname];
        genNestModuleService(pgname, packages[pgname]);
        // Object.keys(serviceList).forEach((service) => {
        //   genNestModuleService(pgname, service);
        // });
    });
}
function genNestModule(packageName) {
    const m = packageName.split(".").pop();
    const moduelName = m.charAt(0).toUpperCase() + m.slice(1);
    const formatter = new TextFormatter();
    formatter.writeLine(`/* eslint-disable */
import { DynamicModule, Module } from "@nestjs/common";
import { ${moduelName}Service } from "./${moduelName}Service";

@Module({
  providers: [],
  controllers: [],
})
export class ${moduelName}Module {
  static forRoot(uri=''): DynamicModule {
    return {
      global: true,
      module: ${moduelName}Module,
      providers: [${moduelName}Service,{
          provide: "SERVICE_URI",
          useValue: uri,
      }],
      exports: [${moduelName}Service],
    };
  }
}`);
    console.log(`write file: handle/${moduelName}Service.ts`);
    writeFile(`handle/${moduelName}Module.ts`, formatter.getFullText());
}
function genNestModuleService(packageName, service) {
    const m = packageName.split(".").pop();
    const moduelName = m.charAt(0).toUpperCase() + m.slice(1);
    const importStr = [];
    const defineStr = [];
    const assignStr = [];
    const pbfile = [];
    Object.keys(service).forEach((name) => {
        importStr.push(`import {${name}Client} from "../interface/${packageName.replace(".", "/")}/${name}";`);
        defineStr.push(`public ${name}Stub!: ${name}Client;`);
        pbfile.push(`const ${name}Client = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: "${packageName}",
        url: url,
        protoPath: join(__dirname, "../${service[name]}"),
        ...extra
      },
    });`);
        assignStr.push(`this.${name}Stub = ${name}Client.getService("${name}");`);
    });
    const formatter = new TextFormatter();
    formatter.writeLine(`/* eslint-disable */
import {Inject,Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import {getServiceByPGname} from "../src/service";
import * as grpc from '@grpc/grpc-js';
${importStr.join("\n")}
import { join } from "path";

@Injectable()
export class ${moduelName}Service implements OnModuleInit {
  ${defineStr.join("\n")}

  @Inject("SERVICE_URI")
  private readonly url: string | undefined;

  async onModuleInit() {
    let extra: any = {}
    const url: string | undefined = this.url ? this.url : await getServiceByPGname("${packageName}");
    if(!url){
      throw new Error("get service:${packageName} rpc url is null");
    }
    if(url && /:443$/.test(url)){
      extra.credentials = grpc.credentials.createSsl()
    }
    ${pbfile.join("\n")}
    ${assignStr.join("\n")}
  }
}`);
    console.log(`write file: handle/${moduelName}Service.ts`);
    writeFile(`handle/${moduelName}Service.ts`, formatter.getFullText());
}
function generateNestClientModuleServiceProxy(formatter, serviceType, options) {
    const prefix = "../".repeat(serviceType.filename.split("/").length - 1);
    const packagePath = getImportPath(serviceType).split("/");
    packagePath.pop();
    const packageName = packagePath.join(".");
    if (!packages[packageName]) {
        packages[packageName] = {};
    }
    if (!packages[packageName][serviceType.name]) {
        packages[packageName][serviceType.name] = serviceType.filename;
    }
}
function generateServiceClientInterface(formatter, serviceType, options) {
    const { outputName, inputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, serviceType.comment, serviceType.options);
    }
    formatter.writeLine(`export interface ${serviceType.name}Client extends grpc.Client {`);
    formatter.indent();
    for (const methodName of Object.keys(serviceType.methods).sort()) {
        const method = serviceType.methods[methodName];
        for (const name of [methodName, camelCase(methodName)]) {
            if (CLIENT_RESERVED_METHOD_NAMES.has(name)) {
                continue;
            }
            if (options.includeComments) {
                formatComment(formatter, method.comment, method.options);
            }
            const requestType = inputName(getTypeInterfaceName(method.resolvedRequestType));
            const responseType = outputName(getTypeInterfaceName(method.resolvedResponseType));
            const callbackType = `grpc.requestCallback<${responseType}>`;
            if (method.requestStream) {
                if (method.responseStream) {
                    // Bidi streaming
                    const callType = `grpc.ClientDuplexStream<${requestType}, ${responseType}>`;
                    formatter.writeLine(`${name}(metadata: grpc.Metadata, options?: grpc.CallOptions): ${callType};`);
                    formatter.writeLine(`${name}(options?: grpc.CallOptions): ${callType};`);
                }
                else {
                    // Client streaming
                    const callType = `grpc.ClientWritableStream<${requestType}>`;
                    formatter.writeLine(`${name}(metadata: grpc.Metadata, options: grpc.CallOptions, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(metadata: grpc.Metadata, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(options: grpc.CallOptions, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(callback: ${callbackType}): ${callType};`);
                }
            }
            else {
                if (method.responseStream) {
                    // Server streaming
                    const callType = `grpc.ClientReadableStream<${responseType}>`;
                    formatter.writeLine(`${name}(argument: ${requestType}, metadata: grpc.Metadata, options?: grpc.CallOptions): ${callType};`);
                    formatter.writeLine(`${name}(argument: ${requestType}, options?: grpc.CallOptions): ${callType};`);
                }
                else {
                    // Unary
                    const callType = "grpc.ClientUnaryCall";
                    formatter.writeLine(`${name}(argument: ${requestType}, metadata: grpc.Metadata, options: grpc.CallOptions, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(argument: ${requestType}, metadata: grpc.Metadata, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(argument: ${requestType}, options: grpc.CallOptions, callback: ${callbackType}): ${callType};`);
                    formatter.writeLine(`${name}(argument: ${requestType}, callback: ${callbackType}): ${callType};`);
                    // (data: req, meta?: Metadata) => Observable<resp>
                    formatter.writeLine(`${name}(argument: ${requestType}Dto, metadata?: Metadata) : Observable<${responseType}Dto>;`);
                    // formatter.writeLine(
                    //   `${name} : ICallFunction<${requestType},${responseType}>;`
                    // );
                }
            }
        }
        formatter.writeLine("");
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateServiceHandlerInterface(formatter, serviceType, options) {
    const { inputName, outputName } = useNameFmter(options);
    if (options.includeComments) {
        formatComment(formatter, serviceType.comment, serviceType.options);
    }
    formatter.writeLine(`export interface ${serviceType.name}Handlers extends grpc.UntypedServiceImplementation {`);
    formatter.indent();
    for (const methodName of Object.keys(serviceType.methods).sort()) {
        const method = serviceType.methods[methodName];
        if (options.includeComments) {
            formatComment(formatter, method.comment, serviceType.options);
        }
        const requestType = outputName(getTypeInterfaceName(method.resolvedRequestType));
        const responseType = inputName(getTypeInterfaceName(method.resolvedResponseType));
        if (method.requestStream) {
            if (method.responseStream) {
                // Bidi streaming
                formatter.writeLine(`${methodName}: grpc.handleBidiStreamingCall<${requestType}, ${responseType}>;`);
            }
            else {
                // Client streaming
                formatter.writeLine(`${methodName}: grpc.handleClientStreamingCall<${requestType}, ${responseType}>;`);
            }
        }
        else {
            if (method.responseStream) {
                // Server streaming
                formatter.writeLine(`${methodName}: grpc.handleServerStreamingCall<${requestType}, ${responseType}>;`);
            }
            else {
                // Unary
                formatter.writeLine(`${methodName}: grpc.handleUnaryCall<${requestType}, ${responseType}>;`);
            }
        }
        formatter.writeLine("");
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateServiceDefinitionInterface(formatter, serviceType, options) {
    const { inputName, outputName } = useNameFmter(options);
    formatter.writeLine(`export interface ${serviceType.name}Definition extends grpc.ServiceDefinition {`);
    formatter.indent();
    for (const methodName of Object.keys(serviceType.methods).sort()) {
        const method = serviceType.methods[methodName];
        const requestType = getTypeInterfaceName(method.resolvedRequestType);
        const responseType = getTypeInterfaceName(method.resolvedResponseType);
        formatter.writeLine(`${methodName}: MethodDefinition<${inputName(requestType)}, ${inputName(responseType)}, ${outputName(requestType)}, ${outputName(responseType)}>`);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateServiceInterfaces(formatter, serviceType, options) {
    var _a, _b;
    formatter.writeLine(`// Original file: ${(_b = ((_a = serviceType.filename) !== null && _a !== void 0 ? _a : "null")) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, "/")}`);
    formatter.writeLine("");
    const grpcImportPath = options.grpcLib.startsWith(".")
        ? getPathToRoot(serviceType) + options.grpcLib
        : options.grpcLib;
    formatter.writeLine(`import type * as grpc from '${grpcImportPath}'`);
    formatter.writeLine(`import type { MethodDefinition } from '@grpc/proto-loader'`);
    formatter.writeLine(`import { Observable } from 'rxjs';`);
    formatter.writeLine(`import { Metadata } from '@grpc/grpc-js';`);
    formatter.writeLine("");
    formatter.writeLine(`type ICallFunction<req, resp> = (data: req, meta?: Metadata) => Observable<resp>;`);
    formatter.writeLine("");
    const dependencies = new Set();
    for (const method of serviceType.methodsArray) {
        dependencies.add(method.resolvedRequestType);
        dependencies.add(method.resolvedResponseType);
    }
    for (const dep of Array.from(dependencies.values()).sort(compareName)) {
        // console.log(dep, serviceType); // genflag
        formatter.writeLine(getImportLine(dep, serviceType, options));
        formatter.writeLine(getImportClassLine(dep, serviceType, options));
    }
    formatter.writeLine("");
    generateServiceClientInterface(formatter, serviceType, options);
    formatter.writeLine("");
    generateServiceHandlerInterface(formatter, serviceType, options);
    formatter.writeLine("");
    generateServiceDefinitionInterface(formatter, serviceType, options);
}
function containsDefinition(definitionType, namespace) {
    for (const nested of namespace.nestedArray.sort(compareName)) {
        if (nested instanceof definitionType) {
            return true;
        }
        else if (isNamespaceBase(nested) &&
            !(nested instanceof Protobuf.Type) &&
            !(nested instanceof Protobuf.Enum) &&
            containsDefinition(definitionType, nested)) {
            return true;
        }
    }
    return false;
}
function generateDefinitionImports(formatter, namespace, options) {
    const imports = [];
    if (containsDefinition(Protobuf.Enum, namespace)) {
        imports.push("EnumTypeDefinition");
    }
    if (containsDefinition(Protobuf.Type, namespace)) {
        imports.push("MessageTypeDefinition");
    }
    if (imports.length) {
        formatter.writeLine(`import type { ${imports.join(", ")} } from '@grpc/proto-loader';`);
    }
}
function generateServiceImports(formatter, namespace, options) {
    for (const nested of namespace.nestedArray.sort(compareName)) {
        if (nested instanceof Protobuf.Service) {
            formatter.writeLine(getImportLine(nested, undefined, options));
        }
        else if (isNamespaceBase(nested) &&
            !(nested instanceof Protobuf.Type) &&
            !(nested instanceof Protobuf.Enum)) {
            generateServiceImports(formatter, nested, options);
        }
    }
}
function generateSingleLoadedDefinitionType(formatter, nested, options) {
    if (nested instanceof Protobuf.Service) {
        if (options.includeComments) {
            formatComment(formatter, nested.comment, nested.options);
        }
        const typeInterfaceName = getTypeInterfaceName(nested);
        formatter.writeLine(`${nested.name}: SubtypeConstructor<typeof grpc.Client, ${typeInterfaceName}Client> & { service: ${typeInterfaceName}Definition }`);
    }
    else if (nested instanceof Protobuf.Enum) {
        formatter.writeLine(`${nested.name}: EnumTypeDefinition`);
    }
    else if (nested instanceof Protobuf.Type) {
        formatter.writeLine(`${nested.name}: MessageTypeDefinition`);
    }
    else if (isNamespaceBase(nested)) {
        generateLoadedDefinitionTypes(formatter, nested, options);
    }
}
function generateLoadedDefinitionTypes(formatter, namespace, options) {
    formatter.writeLine(`${namespace.name}: {`);
    formatter.indent();
    for (const nested of namespace.nestedArray.sort(compareName)) {
        generateSingleLoadedDefinitionType(formatter, nested, options);
    }
    formatter.unindent();
    formatter.writeLine("}");
}
function generateRootFile(formatter, root, options) {
    formatter.writeLine(`import type * as grpc from '${options.grpcLib}';`);
    generateDefinitionImports(formatter, root, options);
    formatter.writeLine("");
    generateServiceImports(formatter, root, options);
    formatter.writeLine("");
    formatter.writeLine("type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {");
    formatter.writeLine("  new(...args: ConstructorParameters<Constructor>): Subtype;");
    formatter.writeLine("};");
    formatter.writeLine("");
    formatter.writeLine("export interface ProtoGrpcType {");
    formatter.indent();
    for (const nested of root.nestedArray) {
        generateSingleLoadedDefinitionType(formatter, nested, options);
    }
    formatter.unindent();
    formatter.writeLine("}");
    formatter.writeLine("");
}
function writeFile(filename, contents) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.promises.mkdir(path.dirname(filename), { recursive: true });
        // console.log(filename);
        return fs.promises.writeFile(filename, contents);
    });
}
function generateFilesForNamespace(namespace, options) {
    const filePromises = [];
    for (const nested of namespace.nestedArray) {
        const fileFormatter = new TextFormatter();
        if (nested instanceof Protobuf.Type) {
            // console.log("1");
            generateMessageInterfaces(fileFormatter, nested, options);
            if (options.verbose) {
                console.log(`Writing ${options.outDir}/${getPath(nested)} from file ${nested.filename}`);
            }
            filePromises.push(writeFile(`${options.outDir}/${getPath(nested)}`, fileFormatter.getFullText()));
        }
        else if (nested instanceof Protobuf.Enum) {
            // console.log("2");
            generateEnumInterface(fileFormatter, nested, options);
            if (options.verbose) {
                console.log(`Writing ${options.outDir}/${getPath(nested)} from file ${nested.filename}`);
            }
            filePromises.push(writeFile(`${options.outDir}/${getPath(nested)}`, fileFormatter.getFullText()));
        }
        else if (nested instanceof Protobuf.Service) {
            // console.log("3", nested);
            generateServiceInterfaces(fileFormatter, nested, options);
            if (options.verbose) {
                console.log(`Writing ${options.outDir}/${getPath(nested)} from file ${nested.filename}`);
            }
            filePromises.push(writeFile(`${options.outDir}/${getPath(nested)}`, fileFormatter.getFullText()));
            const fileFormatter3 = new TextFormatter();
            generateNestClientModuleServiceProxy(fileFormatter3, nested, options);
        }
        else if (isNamespaceBase(nested)) {
            filePromises.push(...generateFilesForNamespace(nested, options));
        }
    }
    return filePromises;
}
function writeFilesForRoot(root, masterFileName, options) {
    const filePromises = [];
    const masterFileFormatter = new TextFormatter();
    generateRootFile(masterFileFormatter, root, options);
    if (options.verbose) {
        console.log(`Writing ${options.outDir}/${masterFileName}`);
    }
    filePromises.push(writeFile(`${options.outDir}/${masterFileName}`, masterFileFormatter.getFullText()));
    filePromises.push(...generateFilesForNamespace(root, options));
    return filePromises;
}
function writeAllFiles(protoFiles, options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.promises.mkdir(options.outDir, { recursive: true });
        const basenameMap = new Map();
        for (const filename of protoFiles) {
            // console.log(protoFiles);
            const basename = path.basename(filename).replace(/\.proto$/, ".ts");
            if (basenameMap.has(basename)) {
                basenameMap.get(basename).push(filename);
            }
            else {
                basenameMap.set(basename, [filename]);
            }
        }
        for (const [basename, filenames] of basenameMap.entries()) {
            const loadedRoot = yield (0, util_1.loadProtosWithOptions)(filenames, options);
            // console.log(loadedRoot);
            writeFilesForRoot(loadedRoot, basename, options);
        }
    });
}
function runScript() {
    return __awaiter(this, void 0, void 0, function* () {
        const boolDefaultFalseOption = {
            boolean: true,
            default: false,
        };
        const argv = yargs
            .parserConfiguration({
            "parse-positional-numbers": false,
        })
            .option("keepCase", boolDefaultFalseOption)
            .option("longs", { string: true, default: "Long" })
            .option("enums", { string: true, default: "number" })
            .option("bytes", { string: true, default: "Buffer" })
            .option("defaults", boolDefaultFalseOption)
            .option("arrays", boolDefaultFalseOption)
            .option("objects", boolDefaultFalseOption)
            .option("oneofs", boolDefaultFalseOption)
            .option("json", boolDefaultFalseOption)
            .boolean("verbose")
            .option("includeComments", boolDefaultFalseOption)
            .option("includeDirs", {
            normalize: true,
            array: true,
            alias: "I",
        })
            .option("outDir", {
            alias: "O",
            normalize: true,
        })
            .option("grpcLib", { string: true })
            .option("inputTemplate", { string: true, default: `${templateStr}` })
            .option("outputTemplate", {
            string: true,
            default: `${templateStr}__Output`,
        })
            .option("inputBranded", boolDefaultFalseOption)
            .option("outputBranded", boolDefaultFalseOption)
            .coerce("longs", (value) => {
            switch (value) {
                case "String":
                    return String;
                case "Number":
                    return Number;
                default:
                    return undefined;
            }
        })
            .coerce("enums", (value) => {
            if (value === "String") {
                return String;
            }
            else {
                return undefined;
            }
        })
            .coerce("bytes", (value) => {
            switch (value) {
                case "Array":
                    return Array;
                case "String":
                    return String;
                default:
                    return undefined;
            }
        })
            .alias({
            verbose: "v",
        })
            .describe({
            keepCase: "Preserve the case of field names",
            longs: "The type that should be used to output 64 bit integer values. Can be String, Number",
            enums: "The type that should be used to output enum fields. Can be String",
            bytes: "The type that should be used to output bytes fields. Can be String, Array",
            defaults: "Output default values for omitted fields",
            arrays: "Output default values for omitted repeated fields even if --defaults is not set",
            objects: "Output default values for omitted message fields even if --defaults is not set",
            oneofs: "Output virtual oneof fields set to the present field's name",
            json: "Represent Infinity and NaN as strings in float fields. Also decode google.protobuf.Any automatically",
            includeComments: "Generate doc comments from comments in the original files",
            includeDirs: "Directories to search for included files",
            outDir: "Directory in which to output files",
            grpcLib: "The gRPC implementation library that these types will be used with",
            inputTemplate: 'Template for mapping input or "permissive" type names',
            outputTemplate: 'Template for mapping output or "restricted" type names',
            inputBranded: 'Output property for branded type for  "permissive" types with fullName of the Message as its value',
            outputBranded: 'Output property for branded type for  "restricted" types with fullName of the Message as its value',
        })
            .demandOption(["outDir", "grpcLib"])
            .demand(1)
            .usage("$0 [options] filenames...")
            .epilogue("WARNING: This tool is in alpha. The CLI and generated code are subject to change").argv;
        if (argv.verbose) {
            console.log("Parsed arguments:", argv);
        }
        (0, util_1.addCommonProtos)();
        writeAllFiles(argv._, Object.assign(Object.assign({}, argv), { alternateCommentMode: true })).then(() => {
            genNestModuleAndService(packages);
            if (argv.verbose) {
                console.log("Success");
            }
            // console.log(packages);
            // console.log(moduleName);
            // console.log(serviceList);
        }, (error) => {
            console.error(error);
            process.exit(1);
        });
    });
}
if (require.main === module) {
    runScript();
}
