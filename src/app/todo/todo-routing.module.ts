import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoItemAddComponent } from './todo-item-add/todo-item-add.component';
import { TodoItemUpdComponent } from './todo-item-upd/todo-item-upd.component';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  { path: '', component: TodoListComponent},
  { path: ':id', component: TodoDetailsComponent},
  { path: ':id/new', component: TodoItemAddComponent},
  { path: ':id/upd/:item', component: TodoItemUpdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
