import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { writeFile, readFile, existsSync } from 'fs';

export interface ITodo {
  id: number;
  text: string;
}

@Scope(ScopeEnum.Singleton)
@Provide('TodolistService')
export class TodolistService {
  private todoList: ITodo[] = [];

  async list() {
    if (existsSync('./cache')) {
      const buffer = await new Promise((resolve, reject) => readFile('./cache',
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }));
      this.todoList = JSON.parse(buffer.toString());
    }
    return this.todoList;
  }

  async add(text: string) {
    const list = await this.list();
    list.push({
      id: await this.incrId(),
      text
    });
    await this.flushCache(list);
  }

  async del(id: number) {
    const list = await this.list();
    const idx = list.findIndex((item) => item.id === id);
    list.splice(idx, 1)
    await this.flushCache(list);
  }

  async update(id: number, newText: string) {
    const list = await this.list();
    const idx = list.findIndex((item) => item.id === id);
    if (id) {
      list[idx].text = newText;
      await this.flushCache(list);
    }
  }

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

  private flushCache(list: ITodo[]) {
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
