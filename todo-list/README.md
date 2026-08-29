# midwayjs-tutorial-todo-list

Midway v4 (Koa) todo list 教程项目。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 访问
open http://127.0.0.1:7001
```

包含两种页面：

- `/` — ejs 模板渲染直出的 HTML 页面（`view/home.ejs`）
- `/index.html` — 纯前端渲染页面（`public/index.html`，通过 REST 接口增删改查）

## REST 接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/todo` | 获取 todo 列表 |
| POST | `/api/todo` | 新增 todo（body: `{ text }`） |
| PUT | `/api/todo/:id` | 修改 todo（body: `{ text }`） |
| DELETE | `/api/todo/:id` | 删除 todo |

数据通过 `src/service/todolist.service.ts` 持久化到项目根目录的 `cache` 文件（文件持久化，方便演示）。

## 测试

```bash
npm test
npm run cov   # 覆盖率
```

## 构建与启动

```bash
npm run build          # 编译到 dist
npm start              # 生产模式启动
```
