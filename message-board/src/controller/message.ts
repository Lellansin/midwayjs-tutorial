import { Inject, Controller, Post, Get, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { MessageService } from '../model/service/message';

@Provide()
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
    // TODO
    const cookieText = this.ctx.cookies.get('my_session_data');
    let cookies = null;
    if (cookieText) {
      cookies = JSON.parse(cookieText);
    }

    // TODO 判断用户是否登录，未登录不能发送留言

    const { text } = this.ctx.request.body;
    console.log(cookies.username, text);
    this.messageService.post(cookies.username, text);

    this.ctx.redirect('/');
  }
}
