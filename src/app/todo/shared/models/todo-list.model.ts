import { ITodoItem } from './todo-item.model';
import { v4 as uuid } from 'uuid';

export interface ITodoListAddOrUpd {
  name: string;
}

export interface ITodoList {
  id: uuid;
  name: string;
  toDoItems: ITodoItem[];
}
