import { MidwayConfig } from '@midwayjs/core';
import joi from '@midwayjs/validation-joi';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'hello_world_1756500000000_1234',
  koa: {
    port: 7001,
  },
  validation: {
    validators: {
      joi,
    },
  },
} as MidwayConfig;
