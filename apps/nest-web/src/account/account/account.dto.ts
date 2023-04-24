import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class queryDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'id 必须是数字' })
  id: number;
}

export class queryAccountDto {
  name: string;
}

export class userDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  uid: number;
}

export class helloDataDto {
  id: number;
  name: string;
  s: string;
  user: userDto;
  x: string;
}

export class AllAccountDto {
  info: string;
}
