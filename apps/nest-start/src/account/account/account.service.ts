/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { IsEmail, IsInt, Max, Min } from 'class-validator';
import { ValidateArgs } from '../../common/Decorator';

class queryDto {
  @IsInt()
  @Max(10000)
  @Min(1)
  id: number;

  @IsEmail()
  email: string;
}

type ia = {
  p1: string;
  p2: number;
};

@Injectable()
export class AccountService {
  @ValidateArgs()
  //   @Validate()
  async getInfo(param: queryDto, a: ia) {
    return {
      id: 1,
      name: 'jm',
      ...param,
      ...a,
    };
  }
}
