// Original file: proto/mwp/m1/mwp_m1_book.proto
/* eslint-disable */
import {ApiProperty} from '@nestjs/swagger';


export interface BookBo {
  'id'?: (number);
  'title'?: (string);
  'author'?: (string);
}

export interface BookBo__Output {
/*test*/
  'id': (number);
  'title': (string);
  'author': (string);
}


export class BookBoDto {
  @ApiProperty()
  'id': (number);
  @ApiProperty()
  'title': (string);
  @ApiProperty()
  'author': (string);
}
export class BookBo__OutputDto {
  @ApiProperty()
  'id': (number);
  @ApiProperty()
  'title': (string);
  @ApiProperty()
  'author': (string);
}
