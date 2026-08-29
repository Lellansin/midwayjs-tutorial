import { MidwayConfig } from '@midwayjs/core';

export default {
  koa: {
    port: null,
  },
  // 测试使用独立的数据库，避免污染开发数据
  typeorm: {
    dataSource: {
      default: {
        database: 'message_board_test',
      },
    },
  },
} as MidwayConfig;
