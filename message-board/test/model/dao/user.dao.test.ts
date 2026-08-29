import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { UserDao } from '../../../src/model/dao/user.dao';

describe('UserDao', () => {
  const username = `lellansin_${Date.now()}`;

  it('#add & #findByUsername', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    // 根据依赖注入 class 获取实例
    const userDao = await app.getApplicationContext().getAsync<UserDao>(UserDao);

    const res = await userDao.add(username, '123456');
    expect(res.id).toBeGreaterThan(0);
    expect(res.username).toBe(username);

    const findRes = await userDao.findByUsername(username);
    expect(findRes.id).toBe(res.id);

    // 清理
    await userDao.deleteById(res.id);

    // close app
    await close(app);
  });

  it('#findByUsername 不存在时返回 null', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    const userDao = await app.getApplicationContext().getAsync<UserDao>(UserDao);
    const res = await userDao.findByUsername('not_exist_user_' + Date.now());
    expect(res).toBeNull();

    // close app
    await close(app);
  });
});
