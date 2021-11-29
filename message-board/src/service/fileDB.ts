import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

@Scope(ScopeEnum.Singleton)
@Provide('fileDBService')
export class FileDBService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async list() {
    return this.userModel.find();
  }

  async add(username: string, password: string) {
    // create a entity object
    let user = new User();
    user.username = username;
    user.password = password;

    // save entity
    const userResult = await this.userModel.save(user);

    // save success
    console.log('user id = ', userResult.id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({
      username
    })
    if (user) {
      return user;
    }
    return null;
  }
}
