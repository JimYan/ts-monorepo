import { applyDecorators, HttpException, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

export class baseResponseDto<TData> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  tid: string;

  data: TData;
  @ApiProperty()
  timestamp: string;
}

export class pageDto<TData> {
  @ApiProperty()
  pageIndex: number;
  @ApiProperty()
  pageCount: number;
  @ApiProperty()
  perpage: number;
  // @ApiProperty()
  list: TData[];
}

export function ValidateArgs() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const argIndex = {} as any;
      const argTypes = Reflect.getMetadata(
        'design:paramtypes',
        target,
        propertyName,
      );
      argTypes.forEach((type: any, i: number) => (argIndex[i] = type));
      //   console.log(argTypes);
      await Promise.all(
        Object.keys(args).map(async (i) => {
          if (typeof args[i] !== 'object') {
            return '';
          }
          //   console.log(typeof args[i]);
          //   console.log(typeof argTypes[i]);
          //   console.log(argTypes[i] instanceof ClassConstructor);
          const x = plainToInstance(argTypes[i], args[i]);
          const validator = new Validator();
          const validationErrors = await validator.validate(x);
          //   console.log(validationErrors);
          if (validationErrors.length > 0) {
            throw new HttpException(
              'Validation error :' + JSON.stringify(validationErrors),
              400,
            );
          }
        }),
      );
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

export const ApiClassResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(baseResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiPageResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiExtraModels(pageDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(baseResponseDto) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(pageDto) },
                  {
                    properties: {
                      list: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiArrayResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(baseResponseDto) },
          {
            properties: {
              data: { type: 'array', items: { $ref: getSchemaPath(model) } },
            },
          },
        ],
      },
    }),
  );
};

export const ApiResponse = <TModel extends Type<any>>(
  type: 'string' | 'number' | 'boolean' | 'array' | 'class' | 'page',
  model?: TModel,
) => {
  if (type === 'class') {
    return ApiClassResponse(model);
  } else if (type === 'array') {
    return ApiArrayResponse(model);
  } else if (type === 'page') {
    return ApiPageResponse(model);
  }
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(baseResponseDto) },
          {
            properties: {
              data: { type },
            },
          },
        ],
      },
    }),
  );
};
