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

    // 未登录时渲染出"请登录"入口
    expect(result.status).toBe(200);
    expect(result.text).toContain('请登录');

    // close app
    await close(app);
  });

  it('should GET /login & /register', async () => {
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    const loginRes = await createHttpRequest(app).get('/login');
    expect(loginRes.status).toBe(200);
    expect(loginRes.text).toContain('用户登录');

    const registerRes = await createHttpRequest(app).get('/register');
    expect(registerRes.status).toBe(200);
    expect(registerRes.text).toContain('注册用户');

    await close(app);
  });
});
