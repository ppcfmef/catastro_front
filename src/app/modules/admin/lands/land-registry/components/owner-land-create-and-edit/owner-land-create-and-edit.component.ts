import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';

@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit, OnDestroy {

  @Output() showFormEdit = new EventEmitter<boolean>();
  landOwner: LandOwnerModel = new LandOwnerModel();
  formEdit: FormGroup;
  typeDocs = [
    {val: '01', name:'DNI'},
    {val: '06', name:'RUC'},
  ];

  showAddres = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
  ) {}

  ngOnInit(): void {
    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (result) => {
        this.landOwner.setValue(result);
        this.createFormEdit();
      }
    );
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      documentType: [{ value: this.landOwner.documentType, disabled: !this.isCreate}],
      dni: [{ value: this.landOwner.dni, disabled: !this.isCreate}],
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

  saveForm(): void{
    if (this.formEdit.valid){
      this.landOwner.setValue(this.formEdit.value);
      this.landRegistryService.saveOwner(this.landOwner.toJson())
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        (result) => {
          this.landOwner.setId(result.id);
          this.landRegistryService.setLandOwner(this.landOwner.toJson());
          this.emitShowFormEdit(false);
          this.confirmationService.success(
            'Registro de propietario',
            'Propietario registrado correctamente'
          );
        },
        (error) => {
          this.confirmationService.success(
            'Registro de propietario',
            `Error al registrar propietario - ${JSON.stringify(error?.error)}`
          );
        }
      );
    }else {
      this.confirmationService.success(
        'Registro de propietario',
        'Error al registrar propietario'
      );
    }
  }

  emitShowFormEdit(value: boolean): void {
    if (this.isCreate) {
      this.formEdit.reset();
    }else {
      this.showFormEdit.emit(value);
    }
  }

  resetForm(): void {
    if (this.formEdit) {
      this.formEdit.reset();
    }
  }

  get typeDocSelectValue(): string {
    return this.formEdit.get('documentType').value;
  }

  get isCreate(): boolean {
    return !this.landOwner.id;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
