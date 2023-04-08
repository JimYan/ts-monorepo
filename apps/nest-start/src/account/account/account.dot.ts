import { IsNumberString, IsNumber, IsNotEmpty } from 'class-validator';

export class queryDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'id 必须是数字' })
  id: number;
}
