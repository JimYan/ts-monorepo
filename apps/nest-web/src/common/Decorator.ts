import { applyDecorators, HttpException, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
// import { baseResponseDto } from './base.dto';

export class baseResponseDto<TData> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  tid: string;
  data: TData;
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

export const ApiBaseResponse = <TModel extends Type<any>>(model: TModel) => {
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
