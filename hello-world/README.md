# midwayjs-tutorial-hello-world

Midway v4 (Koa) 基础项目 —— 教程第 1 步：项目初始化。

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 访问
open http://127.0.0.1:7001
```

首页返回 `Hello Bilibili!`，另有示例接口：

```bash
curl -X POST 'http://127.0.0.1:7001/api/get_user?uid=123'
```

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
