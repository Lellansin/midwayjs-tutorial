import { Inject, Controller, Post, Query } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/get_user')
  async getUser(@Query('uid') uid: string): Promise<IGetUserResponse> {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
