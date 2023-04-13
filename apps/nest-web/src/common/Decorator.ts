import { HttpException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

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
