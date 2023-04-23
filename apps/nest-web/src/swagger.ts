import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const { generateApi, generateTemplates } = require('swagger-typescript-api');
import { generateApi, generateTemplates } from 'swagger-typescript-api';
import { baseResponseDto } from './common/Decorator';
import * as fs from 'fs';
import * as path from 'path';

export const swaggerInit = (app: INestApplication) => {
  // swagger初始化
  const options = new DocumentBuilder()
    .setTitle('nest openapi example')
    // .setDescription('项目demo')
    .setVersion('1.0')
    // .addTag('cats')

    // .setResponseWrapper()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [baseResponseDto],
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api', app, document);
  // return;

  const swaggerPath = path.join(__dirname, '../swagger-spec.json');
  if (process.env.SWAGGER_API === undefined) {
    throw new Error('请在.env文件中定义SWAGGER_API的绝对路径');
  }
  const outPath = process.env.SWAGGER_API;
  fs.writeFileSync(swaggerPath, JSON.stringify(document));

  generateApi({
    name: 'api.impl.ts',
    output: outPath,
    input: swaggerPath,
    httpClientType: 'fetch', // or "fetch"
    // defaultResponseAsSuccess: false,
    generateClient: true,
    generateRouteTypes: true,
    generateResponses: true,
    // toJS: false,
    // extractRequestParams: false,
    // extractRequestBody: false,
    // extractEnums: false,
    // unwrapResponseData: false,
    prettier: {
      // By default prettier config is load from your project
      printWidth: 120,
      tabWidth: 2,
      trailingComma: 'all',
      parser: 'typescript',
    },
    defaultResponseType: 'void',
    // singleHttpClient: true,
    cleanOutput: false,
    enumNamesAsValues: false,
    moduleNameFirstTag: false,
    generateUnionEnums: false,
    typePrefix: '',
    typeSuffix: '',
    enumKeyPrefix: '',
    enumKeySuffix: '',
    addReadonly: false,
    extractingOptions: {
      requestBodySuffix: ['Payload', 'Body', 'Input'],
      requestParamsSuffix: ['Params'],
      responseBodySuffix: ['Data', 'Result', 'Output'],
      responseErrorSuffix: [
        'Error',
        'Fail',
        'Fails',
        'ErrorData',
        'HttpError',
        'BadResponse',
      ],
    },
    /** allow to generate extra files based with this extra templates, see more below */
    extraTemplates: [],
    // anotherArrayType: false,
    fixInvalidTypeNamePrefix: 'Type',
    fixInvalidEnumKeyPrefix: 'Value',
    // codeGenConstructs: (constructs) => ({
    //   ...constructs,
    //   RecordType: (key, value) => `MyRecord<key, value>`,
    // }),
    // primitiveTypeConstructs: (constructs) => ({
    //   ...constructs,
    //   string: {
    //     'date-time': 'Date',
    //   },
    // }),
    // hooks: {
    //   onCreateComponent: (component) => {},
    //   onCreateRequestParams: (rawType) => {},
    //   onCreateRoute: (routeData) => {},
    //   onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    //   onFormatRouteName: (routeInfo, templateRouteName) => {},
    //   onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
    //   onInit: (configuration) => {},
    //   onPreParseSchema: (originalSchema, typeName, schemaType) => {},
    //   onParseSchema: (originalSchema, parsedSchema) => {},
    //   onPrepareConfig: (currentConfiguration) => {},
    // },
  })
    .then(({ files, configuration }) => {
      files.forEach(({ content, name }) => {
        // console.log(name, content);
        // console.log(`${outPath}/${name}.api.ts`);
        fs.writeFileSync(
          `${outPath}/${name}`,
          `/* eslint-disable */
${content}`,
        );
      });
    })
    .catch((e) => console.error(e));
};
