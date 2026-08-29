import { Configuration, App, CommonJSFileDetector } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validation from '@midwayjs/validation';
import * as info from '@midwayjs/info';
import * as staticFile from '@midwayjs/static-file';
import * as view from '@midwayjs/view-ejs';
import { join } from 'path';

@Configuration({
  imports: [
    koa,
    validation,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    staticFile,
    view,
  ],
  importConfigs: [join(__dirname, './config')],
  detector: new CommonJSFileDetector(),
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {}
}
