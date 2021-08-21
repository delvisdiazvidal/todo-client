import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITodoItem, ITodoItemAdd, ToDoItemStatus } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemFormService {

  public form: FormGroup;

  constructor() { }

  public initForm(){
    this.form = new FormGroup({
      itemName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      itemDescription: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  public initAndPopulateForm(item: ITodoItem){
    this.form = new FormGroup({
      itemName: new FormControl(item.name, [Validators.required, Validators.maxLength(20)]),
      itemDescription: new FormControl(item.description, [Validators.required, Validators.maxLength(100)]),
    });
  }

  public deleteForm(){
    return this.form = new FormGroup({});
  }

  public getformValue(form: FormGroup): ITodoItemAdd {
    const newItem: ITodoItemAdd = {
      name: form.value.itemName.trim(),
      description: form.value.itemDescription.trim(),
      status: ToDoItemStatus.PENDING
    };
    return newItem;
  }

  public inValid(form: FormGroup){
      if (!form.valid){
        return true;
    }
  }

  public reset(){
    this.form.reset();
  }

}
