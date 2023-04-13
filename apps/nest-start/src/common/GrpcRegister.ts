import { join } from 'path';

export const m1 = {
  options: {
    package: 'wp.m1',
    url: '127.0.0.1:3002',
    protoPath: join(
      __dirname,
      '../../node_modules/@nighttrax/proto/proto/wp/m1/wp_m1_main.proto',
    ),
  },
};
