import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { ItemFormService } from '../shared/services/item-form.service';
import { TodoListService } from '../shared/services/todo-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ITodoList } from '../shared/models/todo-list.model';
import { ITodoItem } from '../shared/models/todo-item.model';

@Component({
  selector: 'ui-todo-item-upd',
  templateUrl: './todo-item-upd.component.html',
  styleUrls: ['./todo-item-upd.component.css']
})
export class TodoItemUpdComponent implements OnInit, OnDestroy {

  updItemForm: FormGroup;
  subscription: Subscription;
  toDoList: ITodoList;
  toDoItem: ITodoItem;
  indexList: string;
  indexItem: string;
  componentTitle: string;
  componentSubTitle: string;

  constructor(private itemForm: ItemFormService,
              private toDoListService: TodoListService,
              private dialog: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params
          .subscribe( { next: (params: Params) => {
            this.indexList = params.id;
            this.indexItem = params.item;
            this.toDoList = this.toDoListService.getToDoList(this.indexList);
            if (!this.toDoList){
              this.router.navigate(['/']);
            } else {
              this.toDoItem = this.toDoList.toDoItems.find( item => item.id === this.indexItem);
              this.itemForm.initAndPopulateForm(this.toDoItem);
              this.updItemForm = this.itemForm.form;
              this.componentSubTitle = 'Update Item';
            }

          }
    });
  }

  public get inValidForm(){
    if (this.itemForm.inValid(this.updItemForm)){
      return true;
    }
  }

  private get formValue() {
    return this.itemForm.getformValue(this.updItemForm);
  }

  public onCancel(){
    this.itemForm.reset();
    this.router.navigate([`/${this.indexList}`], {relativeTo: this.route});
  }

  public onDismiss(){
    this.router.navigate([`/${this.indexList}`], {relativeTo: this.route});
  }

  public onSubmit(){
    this.dialog.confirm(' This action UPDATE this Item. Are you sure?')
              .then((confirmed) => {
                if (confirmed) {
                  this.toDoListService.updToDoItem(this.indexItem, this.formValue);
                } else { return false; }
              })
              .catch(() => false);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
