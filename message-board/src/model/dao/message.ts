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

  // 查询 (列表)
  async list() {
    return this.message.find();
  }

  // 查询 (根据id)
  async getById(id: number) {
    // return this.message.findByIds([id]);
    return this.message.findOne({ id });
  }
  // 查询 (根据用户)
  // 查询 (根据内容)

  // 新增
  async add(username: string, text: string) {
    // create a entity object
    const msg = new Message();
    msg.username = username;
    msg.text = text;

    // save entity
    const result = await this.message.save(msg);

    // save success
    console.log('msg id = ', result.id);
    return msg;
  }

  // 修改
  async updateById(id: number, text: string) {
    return this.message.update({ id }, { text });
  }

  // 删除
  async deleteById(id: number) {
    return this.message.delete({ id });
  }
}
