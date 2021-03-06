import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';  // egg 中 ctx 的定义
// import * as DB from '../service/fileDB';
import { RenderService } from '../service/render';

@Provide()
@Controller('/')
export class HomeController {
  @Inject('ctx') // 将 ctx 注入到当前 controller 类中
  ctx: Context;

  @Inject('TodolistService')
  db;

  @Inject()
  renderService: RenderService;

  // GET /
  @Get('/')
  async home() {
    // 告诉浏览器，当前返回的是 HTML 页面（而不是纯文本）
    this.ctx.type = 'html';
    const todoList = this.db.list();
    return this.renderService.render({
      list: todoList,
    });
  }
}
