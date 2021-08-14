import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';  // egg 中 ctx 的定义
// import * as DB from '../service/fileDB';

@Provide()
@Controller('/')
export class HomeController {
  @Inject('ctx') // 将 ctx 注入到当前 controller 类中
  ctx: Context;

  @Inject('TodolistService')
  db;

  // GET /
  @Get('/')
  async home() {
    // 告诉浏览器，当前返回的是 HTML 页面（而不是纯文本）
    this.ctx.type = 'html';
    const todoList = this.db.list();

    return `
      动态渲染
      <form action="/api/todo" method="POST">
        <input name="text" /> <button>确定</button>
      </form>

      <ul>
        ${todoList.map((item) => `
          <li>
            <form action="/api/todo/delete" method="get">
              ${item}
              <input name="text" type="hidden" value=${item} />
              <button>删除</button>
            </form>
          </li>
        `).join('')}
      </ul>`;
  }
}
