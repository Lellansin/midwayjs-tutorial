import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { MessageDao } from '../../../src/model/dao/message.dao';

describe('MessageDao', () => {
  const username = `lellansin_${Date.now()}`;

  it('#list', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    // 根据依赖注入 class 获取实例
    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const res = await messageDao.list();
    expect(Array.isArray(res)).toBe(true);

    // close app
    await close(app);
  });

  it('#add & #delete', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const text = 'nihao, a a a !'
    const res = await messageDao.add(username, text);

    const list = await messageDao.list()
    const lastItem = list[list.length - 1];
    expect(res.text).toBe(text);
    expect(lastItem.text).toBe(text);

    await messageDao.deleteById(res.id);

    const res2 = await messageDao.getById(res.id);
    expect(res2).toBeNull();

    // close app
    await close(app);
  });

  it('#add & #update', async () => {
    // create app
    const app = await createApp<Framework>({
      appDir: process.cwd(),
    });

    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const text = 'nihao, update test!'
    const res = await messageDao.add(username, text);

    const updateText = 'update to this'
    await messageDao.updateById(res.id, updateText);

    const res2 = await messageDao.getById(res.id);
    expect(res2.text).toBe(updateText);

    await messageDao.deleteById(res2.id);

    // close app
    await close(app);
  });
});
