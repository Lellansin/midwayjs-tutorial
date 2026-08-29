import { Controller, Get, Inject } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { MessageService } from '../model/service/message.service';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  messageService: MessageService;

  @Get('/')
  async home() {
    const text = this.ctx.cookies.get('my_session_data');
    let cookies = null;
    if (text) {
      cookies = JSON.parse(text);
    }

    const msgList = await this.messageService.list();
    await this.ctx.render('home', { cookies, msgList });
  }

  @Get('/register')
  async register() {
    await this.ctx.render('register', {});
  }

  @Get('/login')
  async login() {
    await this.ctx.render('login', {});
  }
}
