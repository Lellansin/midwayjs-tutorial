import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { renderFile } from 'ejs';
import { join } from 'path';

@Scope(ScopeEnum.Singleton)
@Provide()
export class RenderService {

  async render(locals) {
    return renderFile(join(__dirname, '../app/view/home.ejs'), locals);
  }
}
