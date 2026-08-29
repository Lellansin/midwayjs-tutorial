import { Singleton } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Singleton()
export class UserDao {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async list() {
    return this.userModel.find();
  }

  async add(username: string, password: string) {
    // create a entity object
    const user = new User();
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
      where: { username },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async deleteById(id: number) {
    return this.userModel.delete({ id });
  }
}
