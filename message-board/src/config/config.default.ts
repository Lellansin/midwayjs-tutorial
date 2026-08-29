import { MidwayConfig } from '@midwayjs/core';
import joi from '@midwayjs/validation-joi';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'message_board_1756500000000_9012',
  koa: {
    port: 7001,
  },
  validation: {
    validators: {
      joi,
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
  // typeorm 数据库连接
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'message_board',
        // 如果第一次使用，不存在表，有同步的需求可以写 true
        synchronize: true,
        logging: true,
        entities: ['**/*.entity.{j,t}s'],
      },
    },
  },
} as MidwayConfig;
