import { Singleton } from '@midwayjs/core';
import { writeFile, readFile, existsSync } from 'fs';
import { join } from 'path';

export interface ITodo {
  id: number;
  text: string;
}

@Singleton()
export class TodolistService {
  private todoList: ITodo[] = [];

  private get cacheFile() {
    return join(process.cwd(), 'cache');
  }

  async list() {
    if (existsSync(this.cacheFile)) {
      const buffer = await new Promise((resolve, reject) => readFile(this.cacheFile,
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
      writeFile(this.cacheFile, JSON.stringify(list), (err) => {
        if (err) {
          return reject(err);
        }
        resolve(null);
      })
    );
  }
}
