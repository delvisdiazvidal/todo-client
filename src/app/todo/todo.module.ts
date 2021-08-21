import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoItemAddComponent } from './todo-item-add/todo-item-add.component';
import { TodoItemUpdComponent } from './todo-item-upd/todo-item-upd.component';
import { AppRoutingModule } from '../app-routing.module';
import { ItemFormComponent } from './shared/components/item-form/item-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFormComponent } from './todo-list/list-form/list-form.component';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoDetailsComponent,
    TodoItemAddComponent,
    TodoItemUpdComponent,
    ItemFormComponent,
    ListFormComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class TodoModule { }
