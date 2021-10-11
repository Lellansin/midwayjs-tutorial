import { Inject, Controller, Post, Get, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/register')
  async register(): Promise<IGetUserResponse> {
    const { username, password } = this.ctx.request.body;
    if (!username || !password) {
      this.ctx.status = 500;
      return { success: false, message: '参数错误' };
    }
    const user = await this.userService.register(username, password);
    this.ctx.redirect('/login');
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(): Promise<IGetUserResponse> {
    const { username, password } = this.ctx.request.body;
    const success = await this.userService.login(username, password);
    if (success) {
      // 成功登录
      this.ctx.cookies.set('my_session_data', JSON.stringify({ username }))
      this.ctx.redirect('/');
      return;
    } else {
      // 登录失败
      // TODO 密码错误三次禁止登录
      this.ctx.status = 403;
    }
  }

  @Get('/logout')
  async logout() {
    this.ctx.cookies.set('my_session_data', '')
    this.ctx.redirect('/');
  }
}
