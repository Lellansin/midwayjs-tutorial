import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    // make request
    const result = await createHttpRequest(app).get('/');

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.text).toContain('EJS 模板渲染');

    // close app
    await close(app);
  });
});
