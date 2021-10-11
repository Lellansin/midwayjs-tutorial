import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { writeFile, readFile, existsSync } from 'fs';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

@Scope(ScopeEnum.Singleton)
@Provide('fileDBService')
export class FileDBService {
  private _userList: IUser[] = [];

  async list() {
    if (existsSync('./cache')) {
      const buffer = await new Promise((resolve, reject) => readFile('./cache',
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }));
      this._userList = JSON.parse(buffer.toString());
    }
    return this._userList;
  }

  async add(username: string, password: string) {
    const list = await this.list();
    const item = await this.findByUsername(username);
    if (item) {
      throw new Error(`username ${username} exists`);
    }
    const user = {
      id: await this.incrId(),
      username,
      password
    };
    list.push(user);
    await this.flushCache(list);
    return user;
  }

  async findByUsername(username: string) {
    const list = await this.list();
    const idx = list.findIndex((item) => item.username === username);
    if (idx !== -1) {
      return list[idx];
    }
    return null;
  }

  async del(id: number) {
    const list = await this.list();
    const idx = list.findIndex((item) => item.id === id);
    list.splice(idx, 1)
    await this.flushCache(list);
  }

  // async update(id: number, newText: string) {
  //   const list = await this.list();
  //   const idx = list.findIndex((item) => item.id === id);
  //   if (id) {
  //     list[idx].text = newText;
  //     await this.flushCache(list);
  //   }
  // }

  private async incrId() {
    const list = await this.list();
    let maxId = 0;
    for (const { id } of list) {
      if (id > maxId) {
        maxId = id;
      }
    }
    return maxId + 1;
  }

  private flushCache(list: IUser[]) {
    return new Promise((resolve, reject) =>
      writeFile('./cache', JSON.stringify(list), (err) => {
        if (err) {
          return reject(err);
        }
        resolve(null);
      })
    );
  }
}
