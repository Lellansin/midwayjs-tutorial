import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Message } from '../entity/message';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

@Scope(ScopeEnum.Singleton)
@Provide()
export class MessageDao {
  @InjectEntityModel(Message)
  message: Repository<Message>;

  // 查询
  async list() {
    return this.message.find();
  }

  // 新增
  async add(username: string, text: string) {
    // create a entity object
    let msg = new Message();
    msg.username = username;
    msg.text = text;

    // save entity
    const result = await this.message.save(msg);

    // save success
    console.log('msg id = ', result.id);
    return msg;
  }
}
