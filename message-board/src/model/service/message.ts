import { Provide, Inject } from '@midwayjs/decorator';
import { MessageDao } from '../dao/message';

@Provide()
export class MessageService {
  @Inject()
  messageDao: MessageDao;

  // 查询留言列表
  async list() {
    return this.messageDao.list();
  }

  // 发送留言
  async post(username: string, text: string) {
    return this.messageDao.add(username, text);
  }
}
