import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { unlinkSync, existsSync } from 'fs';

describe('test/controller/api.test.ts', () => {
  let app;
  let createdId: number;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>({
      appDir: process.cwd(),
    });
  });

  afterAll(async () => {
    // 清理文件持久化产生的 cache 文件
    if (existsSync('cache')) {
      unlinkSync('cache');
    }
    // close app
    await close(app);
  });

  it('should POST /api/todo', async () => {
    const result = await createHttpRequest(app)
      .post('/api/todo')
      .send({ text: '今天要学数学' });

    // 新增成功后重定向回首页
    expect(result.status).toBe(302);
    expect(result.headers.location).toBe('/');

    const list = await createHttpRequest(app).get('/api/todo');
    const lastItem = list.body[list.body.length - 1];
    createdId = lastItem.id;
    expect(lastItem.text).toBe('今天要学数学');
  });

  it('should PUT /api/todo/:id', async () => {
    const result = await createHttpRequest(app)
      .put('/api/todo/' + createdId)
      .send({ text: '今天要学英语' });

    // 接口没有返回值，koa 默认返回 204
    expect(result.status).toBe(204);

    const list = await createHttpRequest(app).get('/api/todo');
    const lastItem = list.body[list.body.length - 1];
    expect(lastItem.text).toBe('今天要学英语');
  });

  it('should DELETE /api/todo/:id', async () => {
    const result = await createHttpRequest(app).delete('/api/todo/' + createdId);

    // 接口没有返回值，koa 默认返回 204
    expect(result.status).toBe(204);

    const list = await createHttpRequest(app).get('/api/todo');
    const lastItem = list.body[list.body.length - 1];
    expect(lastItem).toBeUndefined();
  });
});
