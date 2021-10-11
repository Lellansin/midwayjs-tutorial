import { Controller, Get, Inject, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { RenderService } from '../service/render';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  renderService: RenderService;

  @Inject()
  ctx: Context;

  @Get('/')
  async home() {
    const text = this.ctx.cookies.get('my_session_data');
    let cookies = null;
    if (text) {
      cookies = JSON.parse(text);
    }
    return this.renderService.render('home', { cookies });
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
