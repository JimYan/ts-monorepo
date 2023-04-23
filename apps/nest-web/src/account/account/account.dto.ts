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
}

export class helloDataDto {
  // @ApiProperty()
  id: number;
  // @ApiProperty()
  name: string;
  // @ApiProperty()
  s: string;

  // @ApiProperty()
  user: userDto;

  // @ApiProperty()
  x: string;
}
