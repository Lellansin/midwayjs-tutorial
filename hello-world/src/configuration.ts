import { Configuration, App, CommonJSFileDetector } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validation from '@midwayjs/validation';
import * as info from '@midwayjs/info';
import { join } from 'path';

@Configuration({
  imports: [
    koa,
    validation,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
  detector: new CommonJSFileDetector(),
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {}
}
