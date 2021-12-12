import { Provide, Inject } from '@midwayjs/decorator';
import { UserDao } from '../dao/user';

@Provide()
export class UserService {
  @Inject()
  userDao: UserDao;

  // 将用户数据插入数据库
  async register(username: string, password: string) {
    return await this.userDao.add(username, password);
  }

  // 检查用户密码是否与数据库中匹配
  async login(username: string, password: string) {
    const user = await this.userDao.findByUsername(username);
    if (user && user.password === password) {
      return true;
    }
    return false;
  }
}
