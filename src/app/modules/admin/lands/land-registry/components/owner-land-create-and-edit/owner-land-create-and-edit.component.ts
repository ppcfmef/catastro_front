import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, OnChanges, Output, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { IntegrationService } from 'app/shared/services/integration.service';
import { User } from 'app/core/user/user.types';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';


@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit, OnChanges, OnDestroy {

  @Input() landOwnerIn: LandOwner;
  @Output() showFormEdit = new EventEmitter<boolean>();
  landOwner = new LandOwnerModel();
  formEdit: FormGroup;
  typeDocs = [
    {val: '01', name:'DNI'},
    {val: '06', name:'RUC'},
  ];

  showAddres = false;
  user: User;
  ubigeo: string;
  hideSelectUbigeo= true;
  unsubscribeAll: Subject<any> = new Subject<any>();
  idView = 'regnrewcon';

  constructor(
    private fb: FormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private integrationService: IntegrationService,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) {}

  ngOnInit(): void {
    this.navigationAuthorizationService.userScopePermission(this.idView)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: any) => {
      if(!data?.limitScope){
        this.ubigeo = null;
        this.hideSelectUbigeo = false;
      }
      else {
        this.hideSelectUbigeo = true;
        this.ubigeo = data?.ubigeo;
      }

      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ownerCurentValue = changes?.landOwnerIn?.currentValue;
    if (ownerCurentValue) {
      this.landOwner.setValue(ownerCurentValue);
    }
    this.createFormEdit();
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      ubigeo: [{ value: this.landOwner.ubigeo, disabled: !this.isCreate}],
      code: [{ value: this.landOwner.code, disabled: !this.isCreate}],
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
      .toPromise()
      .then(
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
      this.formEdit?.reset();
    }else {
      this.showFormEdit.emit(value);
    }
  }

  resetForm(): void {
    if (this.formEdit) {
      this.formEdit?.reset();
    }
  }

  getIntegrationData(): void {
    const documentType = this.formEdit.get('documentType').value;
    const document = this.formEdit.get('dni').value;
    if (documentType === '01') {
      this.integrationService.getPerson(document)
      .toPromise().then(
        (result) => {
          this.formEdit.get('name').setValue(result.nane);
          this.formEdit.get('maternalSurname').setValue(result.maternalSurname);
          this.formEdit.get('paternalSurname').setValue(result.paternalSurname);
        }
      );
    }
    else if(documentType === '06') {
      this.integrationService.getBusiness(document)
      .toPromise().then(
        (result) => {
          this.formEdit.get('descriptionOwner').setValue(result.businessName);
        }
      );
    }
  }

  get typeDocSelectValue(): string {
    return this.formEdit.get('documentType').value;
  }

  get isCreate(): boolean {
    return !this.landOwner.id;
  }

  onSelectUbigeo(ubigeo: string): void {
    this.ubigeo = ubigeo;
    console.log('this.ubigeo >>>', this.ubigeo);
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    this.formEdit.get('ubigeo').setValue(this.ubigeo);
    console.log('create user >>>', this.formEdit.value);
  }

  ngOnDestroy(): void {
    this.formEdit?.reset();
  }
}
