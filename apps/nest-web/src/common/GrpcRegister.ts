import { join } from 'path';

export const m1 = {
  options: {
    package: 'mwp.m1',
    url: '127.0.0.1:3002',
    protoPath: join(
      __dirname,
      '../../node_modules/@nighttrax/proto/proto/mwp/m1/mwp_m1_main.proto',
    ),
  },
};

export const m2 = {
  options: {
    package: 'mwp.m2',
    url: '127.0.0.1:3003',
    protoPath: join(
      __dirname,
      '../../node_modules/@nighttrax/proto/proto/mwp/m2/mwp_m2_account.proto',
    ),
  },
};
