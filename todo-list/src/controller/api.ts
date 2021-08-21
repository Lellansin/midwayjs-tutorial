import { Inject, Controller, Post, Get, Put, Del, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';
import { TodolistService } from '../service/fileDB';

@Provide()
@Controller('/api')
export class APIController {
  @Inject('ctx')
  ctx: Context;

  @Inject('TodolistService')
  db: TodolistService;

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
    this.db.add(text);

    // 跳转到直出的 HTML 页面
    this.ctx.redirect('/');
    return 'ok';
  }

  // GET /api/todo
  @Get('/todo')
  async getTodo() {
    return this.db.list();
  }

  // DELETE /api/todo
  @Del('/todo')
  async deleteTodo() {
    const { text } = this.ctx.query;
    this.db.del(text);
  }

  // PUT /api/todo
  @Put('/todo')
  async putTodo() {
    const { oldText, newText } = this.ctx.query;
    this.db.update(oldText, newText);
  }
}
