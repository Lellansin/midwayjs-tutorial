import { Inject, Controller, Get, Post, Put, Del } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { TodolistService } from '../service/todolist.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todolistService: TodolistService;

  // POST /api/todo
  @Post('/todo')
  async addTodo() {
    const { text } = this.ctx.request.body;
    await this.todolistService.add(text);

    // 跳转到直出的 HTML 页面
    this.ctx.redirect('/');
    return 'ok';
  }

  // GET /api/todo
  @Get('/todo')
  async getTodo() {
    return await this.todolistService.list();
  }

  // DELETE /api/todo/:id
  // curl localhost:7001/api/todo/1234  -> id: 1234
  @Del('/todo/:id')
  async deleteTodo() {
    const { id } = this.ctx.params;
    await this.todolistService.del(Number(id));
  }

  // PUT /api/todo/:id
  @Put('/todo/:id')
  async putTodo() {
    const { id } = this.ctx.params;
    const { text } = this.ctx.request.body;
    await this.todolistService.update(Number(id), text);
  }
}
