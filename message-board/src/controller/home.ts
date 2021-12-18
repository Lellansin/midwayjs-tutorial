import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { MessageService } from '../model/service/message';
import { RenderService } from '../model/service/render';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  renderService: RenderService;

  @Inject()
  messageService: MessageService;

  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    const text = this.ctx.cookies.get('my_session_data');
    let cookies = null;
    if (text) {
      cookies = JSON.parse(text);
    }

    const msgList = await this.messageService.list();
    return this.renderService.render('home', { cookies, msgList });
  }

  @Get('/register')
  async register() {
    return this.renderService.render('register', {});
  }

  @Get('/login')
  async login() {
    return this.renderService.render('login', {});
  }
}
