import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { MessageDao } from '../../src/model/dao/message.dao';
import { UserDao } from '../../src/model/dao/user.dao';

describe('test/controller/message.test.ts', () => {
  const username = `msg_user_${Date.now()}`;
  const password = '123456';

  it('should POST /message & GET /message', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    // 注册并登录，拿到服务端种下的登录 cookie
    await createHttpRequest(app)
      .post('/user/register')
      .send({ username, password });

    const loginRes = await createHttpRequest(app)
      .post('/user/login')
      .send({ username, password });
    const cookie = loginRes.headers['set-cookie']
      .map((item: string) => item.split(';')[0])
      .join('; ');

    // 带登录 cookie 发送留言
    const postRes = await createHttpRequest(app)
      .post('/message')
      .set('Cookie', cookie)
      .send({ text: 'hello message board' });
    expect(postRes.status).toBe(302);
    expect(postRes.headers.location).toBe('/');

    // 留言列表能查到刚发送的内容
    const listRes = await createHttpRequest(app).get('/message');
    expect(listRes.status).toBe(200);
    const lastItem = listRes.body[listRes.body.length - 1];
    expect(lastItem.username).toBe(username);
    expect(lastItem.text).toBe('hello message board');

    // 清理测试数据
    const appCtx = app.getApplicationContext();
    const messageDao = await appCtx.getAsync<MessageDao>(MessageDao);
    await messageDao.deleteById(lastItem.id);
    const userDao = await appCtx.getAsync<UserDao>(UserDao);
    const user = await userDao.findByUsername(username);
    await userDao.deleteById(user.id);

    // close app
    await close(app);
  });
});
