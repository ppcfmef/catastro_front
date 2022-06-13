import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit {

  @Output()
  showFormEdit = new EventEmitter<Boolean>();

  formEdit: FormGroup;
  typeDocSelectValue: number = 1;

  typeDocs = [
    {val: 1, name:'DNI'},
    {val: 2, name:'RUC'},
  ];

  constructor() {
    this.createFormEdit();
  }

  ngOnInit(): void {
    this.formEdit.get('tipo_doc').valueChanges.subscribe( () => {
      const value =  this.formEdit.get('tipo_doc').value;
      this.typeDocSelectValue = parseInt(value, 10);
    });
  }

  createFormEdit(): void{
    this.formEdit =  new FormGroup({
      tipo_doc: new FormControl(),
    });
  }

  emitShowFormEdit(){
    this.showFormEdit.emit(false);
  }

}
