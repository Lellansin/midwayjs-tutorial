import { Inject, Controller, Post, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

export const todoList = [];

@Provide()
@Controller('/api')
export class APIController {
  @Inject('ctx')
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user')
  async getUser(@Query() uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  // POST /api/todo
  @Post('/todo')
  async addTodo() {
    const { text } = this.ctx.request.body;
    todoList.push(text);
    // 跳转到直出的 HTML 页面
    this.ctx.redirect('/');
    return 'ok';
  }

  // GET /api/todo
  @Get('/todo')
  async getTodo() {
    return todoList;
  }
}
