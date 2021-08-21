import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';
import { TodoListService } from './../../shared/services/todo-list.service';
import { ITodoList, ITodoListAddOrUpd } from './../../shared/models/todo-list.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.css']
})
export class ListFormComponent implements OnInit, OnDestroy {

  listForm: FormGroup;
  subscription: Subscription;
  editMode: boolean;
  listIndex: string;
  editedItem: ITodoList;

  constructor(private toDoListService: TodoListService,
              private dialog: ConfirmDialogService) {
                this.editMode = false;
               }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.toDoListService.$todoListEditing
      .subscribe((index: number) => {
          this.listIndex = index.toString();
          this.editMode = true;
          this.editedItem = this.toDoListService.getToDoList(this.listIndex);
          this.listForm.setValue({ listName: this.editedItem.name });
        }
      );
  }

  get errors(){
    return ErrorMesagge;
  }

  get listName(){
    return this.listForm.get('listName');
  }

  public initForm(){
    this.listForm = new FormGroup({
      listName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
  }

  public get formValue(): ITodoListAddOrUpd {
    const newItem: ITodoListAddOrUpd = {
      name: this.listForm.value.listName.trim(),
    };
    return newItem;
  }

  public get inValid(){
      if (!this.listForm.valid && !this.listForm.touched){
        return true;
    }
  }

  public onCancel(){
    this.listForm.reset();
    this.editMode = false;
  }

  public onSubmit(){
    if (this.editMode) {
      this.dialog.confirm(' This action EDIT this List. Are you sure?')
                .then((confirmed) => {
                  if (confirmed) {
                    this.toDoListService.updToDoList(this.listIndex, this.formValue);
                    this.onCancel();
                  } else { return false; }
                })
                .catch(() => false);
    } else {
      this.dialog.confirm(' This action ADD a new List. Are you sure?')
                .then((confirmed) => {
                  if (confirmed) {
                    this.toDoListService.addToDoList(this.formValue);
                    this.onCancel();
                  } else { return false; }
                })
                .catch(() => false);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
