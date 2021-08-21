import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Error404Component } from './core/error/error404/error404.component';
import { Error503Component } from './core/error/error503/error503.component';
import { TodoComponent } from './todo/todo.component';


const appRoutes: Routes = [
  { path: '', component: TodoComponent},
  { path: '404', component: Error404Component},
  { path: '503', component: Error503Component}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
