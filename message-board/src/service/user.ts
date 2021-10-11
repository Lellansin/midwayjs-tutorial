import { Provide, Inject } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { FileDBService } from './fileDB';

@Provide()
export class UserService {
  @Inject()
  fileDBService: FileDBService;

  // 将用户数据插入数据库
  async register(username: string, password: string) {
    return await this.fileDBService.add(username, password);
  }

  // 检查用户密码是否与数据库中匹配
  async login(username: string, password: string) {
    const user = await this.fileDBService.findByUsername(username);
    if (user.password === password) {
      return true;
    }
    return false;
  }

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
