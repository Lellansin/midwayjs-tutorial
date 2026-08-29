import { MidwayConfig } from '@midwayjs/core';
import joi from '@midwayjs/validation-joi';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'todo_list_1756500000000_5678',
  koa: {
    port: 7001,
  },
  validation: {
    validators: {
      joi,
    },
  },
  // 静态文件（public 目录）
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
      },
    },
  },
  // ejs 模板
  view: {
    defaultExtension: '.ejs',
    mapping: {
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs',
    rootDir: {
      default: join(__dirname, '../../view'),
    },
  },
  ejs: {},
} as MidwayConfig;
