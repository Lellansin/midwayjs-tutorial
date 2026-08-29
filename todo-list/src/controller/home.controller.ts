import { Controller, Get, Inject } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { TodolistService } from '../service/todolist.service';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  todolistService: TodolistService;

  // GET /
  @Get('/')
  async home() {
    // 告诉浏览器，当前返回的是 HTML 页面（而不是纯文本）
    this.ctx.type = 'html';
    const todoList = await this.todolistService.list();
    // 使用 ejs 模板渲染直出 HTML
    await this.ctx.render('home', {
      list: todoList,
    });
  }
}
