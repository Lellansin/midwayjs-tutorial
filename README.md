# midwayjs-tutorial

MidwayJS 教程（视频配套源码），已升级到 [Midway v4](https://www.midwayjs.org/docs/quickstart)（Koa）。

## 项目

- [hello-world](./hello-world) — 项目初始化
- [todo-list](./todo-list) — TODO list 网站（web static / ejs 模板 / 文件持久化）
- [message-board](./message-board) — 留言板（midway + typeorm + mysql 增删改查 / 单元测试）

## 技术栈

- Midway v4（Koa，Node >= 20）
- TypeScript + mwtsc 构建 + Jest 测试
- ejs 模板（@midwayjs/view-ejs）
- typeorm 1.x + mysql2（@midwayjs/typeorm）

## 路线图

- web 基础
  - [x] TODO list 网站
  - [x] 留言板
  - [ ] 聊天室（websocket）
  - [ ] blog（一体化研发 / orm 增删改查 / 分页 / markdown）
- 中后台
  - [ ] sso 登录系统
  - [ ] 假期管理后台
  - [ ] 搭建系统
- Serverless
  - [ ] Hello world
  - [ ] 部署博客（聚合部署）

## 运行

每个子项目都是独立的 midway 应用：

```bash
cd todo-list        # 或 hello-world / message-board
npm install
npm run dev         # http://127.0.0.1:7001
```

message-board 需要本机 MySQL（详见其 README）。
