import { Provide, Inject } from '@midwayjs/decorator';
import { MessageDao } from '../dao/message';
import { UserDao } from '../dao/user';

@Provide()
export class MessageService {
  @Inject()
  messageDao: MessageDao;

  @Inject()
  userDao: UserDao;

  // 查询留言列表
  async list() {
    return this.messageDao.list();
  }

  // 发送留言
  async post(username: string, text: string) {
    return this.messageDao.add(username, text);
  }

  async update(username: string, text: string) {
    const user = await this.userDao.findByUsername(username);
    return this.messageDao.updateById(user.id, text);
  }

  async deleteById(id: number) {
    return this.messageDao.deleteById(id);
  }
}
