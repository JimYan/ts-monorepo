import { baseResponseDto } from './Decorator';
class nullClass {}

export class baseStringResponse extends baseResponseDto<nullClass> {
  data: string;
}
