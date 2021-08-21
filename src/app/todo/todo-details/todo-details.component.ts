import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoListService } from '../shared/services/todo-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ITodoList } from '../shared/models/todo-list.model';
import { Subscription } from 'rxjs';
import { ITodoItem, ToDoItemStatus } from '../shared/models/todo-item.model';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Component({
  selector: 'ui-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {

  toDoListItem: ITodoList;
  totalListItem: number;
  subscription: Subscription;
  index: string;
  componentTitle: string;
  componentSubTitle: string;
  emptyMessage: string;

  constructor(private toDoListService: TodoListService,
              private dialog: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) {
                this.componentTitle = 'ToDo List to ';
                this.componentSubTitle = 'All Items in you ToDo List';
                this.emptyMessage = 'ToDo List Items is Empty.';
                this.totalListItem = 0;
              }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe( (params: Params) => {
          this.index = params.id;
          this.getToDoItem(this.index);
        });
  }

  public getToDoItem(index: string){
    this.toDoListService.getToDoListAPI(index)
        .subscribe( (item: ITodoList) => {
          this.toDoListItem = item;
          this.totalListItem = item.toDoItems.length;
      });
  }

  public onNewToDoItem(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  public onEditItem(index: string){
    this.router.navigate([`upd/${index}`], {relativeTo: this.route});
  }

  public onChangeItem(item: ITodoItem){
    this.dialog.confirm(' This action CHANGE the Status of the Item. Are you sure?')
              .then((confirmed) => {
                if (confirmed) {
                  this.toDoListService.changeToDoItemStatus(item);
                } else { return false; }
              })
              .catch(() => false);
  }

  public onDeleteItem(item: ITodoItem){
    if (this.totalListItem > 1) {
      this.dialog.confirm(' This action DELETE this Item. Are you sure?')
                .then((confirmed) => {
                  if (confirmed) {
                    this.toDoListService.delToDoItem(item.id);
                    this.getToDoItem(this.index);
                  } else { return false; }
                })
                .catch(() => false);
      } else {
        this.onDeleteList(item.toDoListId);
      }
  }

  public onDeleteList(index: string){
    this.dialog.confirm(' This is the last Item. If continue this action you could DELETE entire List. Are you sure?')
              .then((confirmed) => {
                if (confirmed) {
                  this.toDoListService.delToDoList(index);
                  this.router.navigate(['/'], {relativeTo: this.route});
                } else { return false; }
              })
              .catch(() => false);
  }

  public get isNotItemsEmpty(){
    return (this.totalListItem > 0) ? true : false;
  }

  public isComplete(status: string){
    return (ToDoItemStatus.COMPLETE === status) ? true : false;
  }

  public isInValid(status: string){
    return (ToDoItemStatus.COMPLETE === status) ? true : false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
