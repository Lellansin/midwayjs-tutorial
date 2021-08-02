# my-midway-project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

[midway]: https://midwayjs.org

## Static 插件

Midway.js 框架 -> egg.js 框架 -> koa.js 框架 (middleware)

### egg 体系下的默认规约

src/config/plugin 插件开关
src/config/config.${环境} 具体环境的（包括插件）配置

### 插件配置

插件目录/config/ 下面能找到插件的配置
