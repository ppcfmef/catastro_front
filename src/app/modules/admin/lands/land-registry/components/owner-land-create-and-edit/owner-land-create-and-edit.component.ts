import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MessageProviderService } from 'app/shared/services/message-provider.service';

@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit {

  @Output()
  showFormEdit = new EventEmitter<boolean>();

  formEdit: FormGroup;
  typeDocSelectValue: number = 1;

  typeDocs = [
    {val: '01', name:'DNI'},
    {val: '06', name:'RUC'},
  ];

  constructor(
    private fb: FormBuilder,
    private alert: MessageProviderService
    ) {
    this.createFormEdit();
  }

  ngOnInit(): void {
    this.formEdit.get('documentType').valueChanges.subscribe( () => {
      this.typeDocSelectValue = this.formEdit.get('documentType').value;
    });
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      documentType: ['01'],
      dni: [''],
      name: [''],
      paternalSurname: [''],
      maternalSurname: [''],
      descriptionOwner: [''],
      phone: [''],
      email: [''],
      address: this.fb.group({
        ubigeo: [''],
        uuType: [''],
        codUu: [''],
        habilitacionName: [''],
        codStreet: [''],
        streetType: [''],
        streetName: [''],
        urbanMza: [],
        urbanLotNumber: [''],
        block: [''],
        indoor: [''],
        floor: [''],
        km: ['']
      })

    });
  }

  emitShowFormEdit(): void{
    console.log(this.formEdit);
    if (this.formEdit.valid){
      this.alert.showSnack('Propietario registrado correctamente');
      this.showFormEdit.emit(false);
    }else {
      this.alert.showSnackError('Error al registrar propietario');
    }
  }
}
