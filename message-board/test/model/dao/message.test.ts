import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import * as assert from 'assert';
import { MessageDao } from '../../../src/model/dao/message';

describe('MessageDao', () => {
  it('#list', async () => {
    // create app
    const app = await createApp<Framework>();
    // 根据依赖注入 class 获取实例
    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const res = await messageDao.list();
    assert(res.length);

    // close app
    await close(app);
  });

  it('#add & #delete', async () => {
    // create app
    const app = await createApp<Framework>();

    // 根据依赖注入 class 获取实例
    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const text = 'nihao, a a a !'
    const res = await messageDao.add('lellansin', text);

    const list = await messageDao.list()
    const lastItem = list[list.length - 1];
    assert.deepStrictEqual(res, lastItem);
    assert.strictEqual(res.text, text);
    assert.strictEqual(lastItem.text, text);

    await messageDao.deleteById(res.id);

    const res2 = await messageDao.getById(res.id);
    assert(!res2);

    // close app
    await close(app);
  });

  it('#add & #update', async () => {
    // create app
    const app = await createApp<Framework>();

    // 根据依赖注入 class 获取实例
    const messageDao = await app.getApplicationContext().getAsync<MessageDao>(MessageDao);

    const text = 'nihao, update test!'
    const res = await messageDao.add('lellansin', text);


    const updateText = 'update to this'
    await messageDao.updateById(res.id, updateText);

    const res2 = await messageDao.getById(res.id);
    assert.strictEqual(res2.text, updateText);

    await messageDao.deleteById(res2.id);

    // close app
    await close(app);
  });
});