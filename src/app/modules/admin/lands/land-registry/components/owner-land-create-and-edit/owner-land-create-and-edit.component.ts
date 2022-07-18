import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';

@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit {

  @Output() showFormEdit = new EventEmitter<boolean>();
  landOwner: LandOwnerModel = new LandOwnerModel();
  formEdit: FormGroup;
  typeDocs = [
    {val: '01', name:'DNI'},
    {val: '06', name:'RUC'},
  ];

  constructor(
    private fb: FormBuilder,
    private alert: MessageProviderService,
    private landRegistryService: LandRegistryService,
  ) {
    this.createFormEdit();
  }

  ngOnInit(): void {}

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      documentType: [this.landOwner.documentType],
      dni: [this.landOwner.dni],
      name: [this.landOwner.name],
      paternalSurname: [this.landOwner.paternalSurname],
      maternalSurname: [this.landOwner.maternalSurname],
      descriptionOwner: [this.landOwner.descriptionOwner],
      phone: [this.landOwner.phone],
      email: [this.landOwner.email],
      address: this.fb.group({
        ubigeo: [this.landOwner.address?.ubigeo],
        uuType: [this.landOwner.address?.uuType],
        codUu: [this.landOwner.address?.codUu],
        habilitacionName: [this.landOwner.address?.habilitacionName],
        codStreet: [this.landOwner.address?.codStreet],
        streetType: [this.landOwner.address?.streetType],
        streetName: [this.landOwner.address?.streetName],
        urbanMza: [this.landOwner.address?.urbanMza],
        urbanLotNumber: [this.landOwner.address?.urbanLotNumber],
        block: [this.landOwner.address?.block],
        indoor: [this.landOwner.address?.indoor],
        floor: [this.landOwner.address?.floor],
        km: [this.landOwner.address?.km]
      })

    });
  }

  emitShowFormEdit(): void{
    if (this.formEdit.valid){
      this.landOwner.setValue(this.formEdit.value);
      this.landRegistryService.createOwner(this.landOwner.toJson())
      .subscribe(
        (result) => {
          this.landOwner.setId(result.id);
          this.landRegistryService.setLandOwner(this.landOwner.toJson());
          this.showFormEdit.emit(false);
          this.alert.showSnack('Propietario registrado correctamente');
        },
        (error) => {
          this.alert.showSnackError(`Error al registrar propietario - ${JSON.stringify(error?.error)}`);
        }
      );
    }else {
      this.alert.showSnackError('Error al registrar propietario');
    }
  }

  get typeDocSelectValue(): string {
    return this.formEdit.get('documentType').value;
  }
}
