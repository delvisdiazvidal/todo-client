import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  @Input() itemForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  get errors(){
    return ErrorMesagge;
  }

  get itemName(){
    return this.itemForm.get('itemName');
  }

  get itemDescription(){
    return this.itemForm.get('itemDescription');
  }

}
