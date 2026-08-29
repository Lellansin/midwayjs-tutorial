import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { UserDao } from '../../src/model/dao/user.dao';

describe('test/controller/user.test.ts', () => {
  const username = `test_user_${Date.now()}`;
  const password = '123456';

  it('should POST /user/register & /user/login', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    // 注册成功跳转到登录页
    const registerRes = await createHttpRequest(app)
      .post('/user/register')
      .send({ username, password });
    expect(registerRes.status).toBe(302);
    expect(registerRes.headers.location).toBe('/login');

    // 登录成功跳转回首页，并种下登录 cookie
    const loginRes = await createHttpRequest(app)
      .post('/user/login')
      .send({ username, password });
    expect(loginRes.status).toBe(302);
    expect(loginRes.headers.location).toBe('/');
    expect(loginRes.headers['set-cookie']).toBeDefined();

    // 登出
    const logoutRes = await createHttpRequest(app).get('/user/logout');
    expect(logoutRes.status).toBe(302);

    // 清理测试用户
    const userDao = await app.getApplicationContext().getAsync<UserDao>(UserDao);
    const user = await userDao.findByUsername(username);
    if (user) {
      await userDao.deleteById(user.id);
    }

    // close app
    await close(app);
  });

  it('should POST /user/login with wrong password', async () => {
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    const loginRes = await createHttpRequest(app)
      .post('/user/login')
      .send({ username, password: 'wrong_password' });
    expect(loginRes.status).toBe(403);

    await close(app);
  });
});
