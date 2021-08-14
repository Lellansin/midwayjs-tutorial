import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { writeFileSync, readFileSync, existsSync } from 'fs';

@Scope(ScopeEnum.Singleton)
@Provide('TodolistService')
export class TodolistService {
  private todoList = [];

  list() {
    if (existsSync('./cache')) {
      const buffer = readFileSync('./cache');
      this.todoList = JSON.parse(buffer.toString());
    }
    return this.todoList;
  }

  add(text) {
    this.todoList.push(text);
    writeFileSync('./cache', JSON.stringify(this.todoList));
  }

  del(text) {
    const idx = this.todoList.findIndex((item) => item === text);
    this.todoList.splice(idx, 1)
    writeFileSync('./cache', JSON.stringify(this.todoList));
  }
}
