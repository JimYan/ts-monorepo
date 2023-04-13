import { IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

export class queryDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'id 必须是数字' })
  id: number;
}

export class userDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
