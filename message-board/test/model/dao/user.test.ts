import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import * as assert from 'assert';
import { UserDao } from '../../../src/model/dao/user';

describe('UserDao', () => {
  it('#list', async () => {
    // create app
    const app = await createApp<Framework>();
    // 根据依赖注入 class 获取实例
    const userDao = await app.getApplicationContext().getAsync<UserDao>(UserDao);

    const res = await userDao.list();
    assert.strictEqual(JSON.stringify(res), JSON.stringify([
      { id: 1, username: 'lellansin1234', password: '123456' },
      { id: 2, username: 'lellansin', password: '123456' },
      { id: 3, username: 'alan', password: '123456' }
    ]))

    // close app
    await close(app);
  });

  it('#findByUsername', async () => {
    // create app
    const app = await createApp<Framework>();

    // 根据依赖注入 class 获取实例
    const userDao = await app.getApplicationContext().getAsync<UserDao>(UserDao);

    const res = await userDao.findByUsername('lellansin');
    assert.strictEqual(res.id, 2);

    // close app
    await close(app);
  });
});