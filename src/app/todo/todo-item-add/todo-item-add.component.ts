import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemFormService } from '../shared/services/item-form.service';
import { ITodoItemAdd } from './../shared/models/todo-item.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoListService } from '../shared/services/todo-list.service';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Component({
  selector: 'ui-todo-item-add',
  templateUrl: './todo-item-add.component.html',
  styleUrls: ['./todo-item-add.component.css']
})
export class TodoItemAddComponent implements OnInit, OnDestroy {

  addItemForm: FormGroup;
  subscription: Subscription;
  indexList: string;
  componentTitle: string;
  componentSubTitle: string;

  constructor(private itemForm: ItemFormService,
              private toDoListService: TodoListService,
              private dialog: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) {
    this.componentTitle = 'Add Item';
    this.componentSubTitle = 'Add Item at yuor List';
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe( (params: Params) => {
      this.indexList = params.id;
    });
    this.itemForm.initForm();
    this.addItemForm = this.itemForm.form;
  }

  public get inValidForm(){
    if (this.itemForm.inValid(this.addItemForm)){
      return true;
    }
  }

  private get formValue() {
    const newItem: ITodoItemAdd = this.itemForm.getformValue(this.addItemForm);
    newItem.toDoListId = this.indexList;
    return newItem;
  }

  public onDismiss(){
    this.router.navigate([`/${this.indexList}`], {relativeTo: this.route});
  }

  public onCancel(){
    this.itemForm.reset();
    this.router.navigate([`/${this.indexList}`], {relativeTo: this.route});
  }

  public onSubmit(){
    this.dialog.confirm(' This action ADD this Item at your List. Are you sure?')
              .then((confirmed) => {
                if (confirmed) {
                  this.toDoListService.addToDoItem(this.formValue);

                } else { return false; }
              })
              .catch(() => false);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
