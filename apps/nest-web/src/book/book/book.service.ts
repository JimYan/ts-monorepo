import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getList(): Promise<IBookItem[]> {
    return Promise.resolve([
      {
        id: 3,
        title: 'asdf',
      },
      {
        id: 4,
        title: 'dd',
      },
    ]);
  }
}

export type IBookItem = {
  id: number;
  title: string;
};
