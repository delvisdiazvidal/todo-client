import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITodoList } from '../shared/models/todo-list.model';
import { TodoListService } from './../shared/services/todo-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  componentTitle: string;
  componentSubTitle: string;
  subscription: Subscription;
  totalToDo: number;
  editMode: boolean;
  todoLists: ITodoList[];
  emptyMessage: string;

  constructor(private toDoListService: TodoListService,
              private dialog: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) {
      this.componentTitle = 'ToDo Lists';
      this.componentSubTitle = '';
      this.emptyMessage = 'ToDo List is Missing.';
      this.editMode = false;
      this.totalToDo = 0;
      this.todoLists = [];
}

  ngOnInit(): void {
    this.toDoListService.fetchToDoList();
    this.getToDoList();
  }

  public getToDoList() {
    this.subscription  = this.toDoListService.getToDoLists()
          .subscribe( items => {
            this.todoLists = (items.length > 0) ? items : null;
            this.totalToDo = items.length;
          }
        );
  }

  public onToDoDetails(index: number){
    this.toDoListService.$todoListEditing.next(index);
    this.router.navigate([index], {relativeTo: this.route});
  }

  public onEditList(index: number){
    this.toDoListService.$todoListEditing.next(index);
  }

  public onDeleteList(index: string){
    this.dialog.confirm(' This action DELETE this List. Are you sure?')
              .then((confirmed) => {
                if (confirmed) {
                  this.toDoListService.delToDoList(index);
                  this.getToDoList();
                } else { return false; }
              })
              .catch(() => false);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
