import { v4 as uuid } from 'uuid';

export enum ToDoItemStatus {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE'
}

export interface ITodoItemAdd {
  name: string;
  description: string;
  status: string;
  toDoListId?: string;
}

export interface ITodoItem {
  id: uuid;
  name: string;
  description: string;
  status: string;
  toDoListId: uuid;
}

