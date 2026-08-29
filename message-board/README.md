# midwayjs-tutorial-message-board

Midway v4 (Koa) 留言板教程项目 —— 使用 midway + typeorm + mysql 编写增删改查 + 单元测试。

## 准备数据库

项目使用 MySQL，默认连接配置在 `src/config/config.default.ts`：

```ts
typeorm: {
  dataSource: {
    default: {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'message_board',
      synchronize: true, // 第一次启动自动建表
      ...
    },
  },
},
```

本地启动 MySQL 后创建数据库：

```sql
CREATE DATABASE message_board DEFAULT CHARACTER SET utf8mb4;
```

测试使用独立数据库 `message_board_test`（见 `src/config/config.unittest.ts`）。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 访问
open http://127.0.0.1:7001
```

## 功能

- 注册 / 登录 / 登出（cookie 记录登录状态）
- 发表留言、查看留言列表
- 页面：`/`（首页留言板）、`/register`、`/login`

## 目录结构（MVC）

```
src/
├── configuration.ts          # 应用入口配置（koa + typeorm + view）
├── config/                   # 环境配置
├── controller/               # Controller 层（路由）
│   ├── home.controller.ts
│   ├── user.controller.ts
│   └── message.controller.ts
├── model/
│   ├── dao/                  # DAO 层（数据库访问，@InjectEntityModel）
│   ├── entity/               # typeorm 实体
│   └── service/              # Service 层（业务逻辑）
└── view/                     # ejs 模板
```

## 测试

```bash
npm test
npm run cov   # 覆盖率
```

DAO 单元测试（`test/model/dao/`）会真实读写测试数据库，请确保 MySQL 已启动。
