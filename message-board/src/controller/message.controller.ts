import { Inject, Controller, Post, Get } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { MessageService } from '../model/service/message.service';

@Controller('/message')
export class MessageController {
  @Inject()
  ctx: Context;

  @Inject()
  messageService: MessageService;

  @Get('/')
  async list(): Promise<any> {
    const list = await this.messageService.list();
    return list;
  }

  @Post('/')
  async post(): Promise<any> {
    const cookieText = this.ctx.cookies.get('my_session_data');
    let cookies = null;
    if (cookieText) {
      cookies = JSON.parse(cookieText);
    }

    // TODO 判断用户是否登录，未登录不能发送留言

    const { text } = this.ctx.request.body as { text: string };
    console.log(cookies.username, text);
    await this.messageService.post(cookies.username, text);

    this.ctx.redirect('/');
  }
}
