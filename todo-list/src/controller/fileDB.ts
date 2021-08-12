
import { writeFileSync, readFileSync, existsSync } from 'fs';

export let todoList = [];

export function list() {
  if (existsSync('./cache')) {
    const buffer = readFileSync('./cache');
    todoList = JSON.parse(buffer.toString());
  }
  return todoList;
}

export function add(text) {
  todoList.push(text);
  writeFileSync('./cache', JSON.stringify(todoList));
}

export function del(text) {
  const idx = todoList.findIndex((item) => item === text);
  todoList.splice(idx, 1)
  writeFileSync('./cache', JSON.stringify(todoList));
}


