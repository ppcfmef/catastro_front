import { Subject } from 'rxjs';
import { Component, EventEmitter, OnInit, OnChanges, Output, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandOwnerModel } from '../../models/land-owner.model';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { IntegrationService } from 'app/shared/services/integration.service';
import { User } from 'app/core/user/user.types';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { environment } from 'environments/environment';
import { SatLandOwner } from 'app/shared/interfaces/integrations.inteface';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';

@Component({
  selector: 'app-owner-land-create-and-edit',
  templateUrl: './owner-land-create-and-edit.component.html',
  styleUrls: ['./owner-land-create-and-edit.component.scss']
})
export class OwnerLandCreateAndEditComponent implements OnInit, OnChanges, OnDestroy {

  @Input() landOwnerIn: LandOwner;
  @Output() showFormEdit = new EventEmitter<boolean>();
  landOwner = new LandOwnerModel();
  formEdit: UntypedFormGroup;
  typeDocs = [
    { val: '01', name: 'DNI' },
    { val: '06', name: 'RUC' },
  ];

  showAddres = false;
  user: User;
  ubigeo: string;
  hideSelectUbigeo = true;
  unsubscribeAll: Subject<any> = new Subject<any>();
  idView = 'regnrewcon';

  constructor(
    private fb: UntypedFormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private integrationService: IntegrationService,
    private navigationAuthorizationService: NavigationAuthorizationService,
    private _fuseSplashScreenService: FuseSplashScreenService,
  ) { }

  ngOnInit(): void { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const navigation = await this.navigationAuthorizationService.userScopePermissionLast(this.idView);
    if (!navigation?.limitScope) {
      this.ubigeo = null;
      this.hideSelectUbigeo = false;
    }
    else {
      this.hideSelectUbigeo = true;
      this.ubigeo = navigation?.ubigeo;
    }

    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;

    const ownerCurentValue = changes?.landOwnerIn?.currentValue;
    if (ownerCurentValue) {
      this.landOwner.setValue(ownerCurentValue);
    }
    this.createFormEdit();
  }

  createFormEdit(): void {
    const ubigeo = this.landOwner.ubigeo || this.ubigeo;
    this.formEdit = this.fb.group({
      ubigeo: [{ value: ubigeo, disabled: !this.isCreate }],
      code: [{ value: this.landOwner.code, disabled: !this.isCreate }],
      documentType: [{ value: this.landOwner.documentType, disabled: !this.isCreate }],
      dni: [{ value: this.landOwner.dni, disabled: !this.isCreate }],
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

  saveForm(): void {
    if (this.formEdit.valid) {
      this._fuseSplashScreenService.show();
      this.landOwner.setValue(this.formEdit.value);
      this.landRegistryService.saveOwner(this.landOwner.toJson())
        .toPromise()
        .then(
          (result) => {
            this._fuseSplashScreenService.hide();
            this.landOwner.setId(result.id);
            this.landRegistryService.setLandOwner(this.landOwner.toJson());
            this.emitShowFormEdit(false);
            this.confirmationService.success(
              'Registro de propietario',
              'Propietario registrado correctamente'
            );

          },
          (error) => {
            this._fuseSplashScreenService.hide();
            this.confirmationService.success(
              'Registro de propietario',
              //'Error al registrar propietario -  el codigo de predio dentro del distrito deben ser unico',
              `Error al registrar propietario - ${JSON.stringify(error?.error)}`
            );

          }
        );
    } else {
      this.confirmationService.success(
        'Registro de propietario',
        'Error al registrar propietario'
      );
    }
  }

  emitShowFormEdit(value: boolean): void {
    /*this.formEdit?.reset();*/


    if (this.isCreate) {
      this.formEdit?.reset();
      this.showFormEdit.emit(value);
    } else {
      this.showFormEdit.emit(value);
    }
  }

  resetForm(): void {
    if (this.formEdit) {
      this.formEdit?.reset();
    }
  }

  getIntegrationData(): void {
    this._fuseSplashScreenService.show();
    const documentType = this.formEdit.get('documentType').value;
    const document = this.formEdit.get('dni').value;

    this.cleanBeforeSearch();

    if (documentType === '01') {
      this.integrationService.getPerson(document)
        .toPromise().then(
          (result) => {
            this._fuseSplashScreenService.hide();
            this.formEdit.get('name').setValue(result.nane);
            this.formEdit.get('maternalSurname').setValue(result.maternalSurname);
            this.formEdit.get('paternalSurname').setValue(result.paternalSurname);
          },
          (error) => {
            this._fuseSplashScreenService.hide();
          }
        );
    }
    else if (documentType === '06') {
      this.integrationService.getBusiness(document)
        .toPromise().then(
          (result) => {
            this.formEdit.get('descriptionOwner').setValue(result.businessName);
          },
          (error) => {
            this._fuseSplashScreenService.hide();
          }
        );
    }
  }

  getIntegrationLandOwner(): void {
    const landOwnerCode = this.formEdit.get('code').value;
    const ubigeo = this.formEdit.get('ubigeo').value;

    this.cleanBeforeSearch();
    if (ubigeo === '220901') {
      this.integrationService.getSatLandOwner(ubigeo, landOwnerCode)
        .toPromise().then(
          (result: { data: SatLandOwner[] }) => {

            if (result && result.data && result.data.length > 0) {
              const landOwner: SatLandOwner = result.data[0];
              this.formEdit.get('dni').setValue(landOwner.nrodocumento);
              this.formEdit.get('maternalSurname').setValue(landOwner.apmaterno);
              this.formEdit.get('paternalSurname').setValue(landOwner.appaterno);
              this.formEdit.get('name').setValue(landOwner.nombre);
              this.formEdit.get('documentType').setValue('01');

            }

          });
    }
    else {
        this.integrationService.getLandOwnerNSRTM(ubigeo, landOwnerCode)
        .toPromise().then(
          (result) => {
            this.formEdit.get('dni').setValue(result.numeroDocumento);
            if (result.tipoDocumento === 2) {
              this.formEdit.get('documentType').setValue('06');
              this.formEdit.get('descriptionOwner').setValue(result.razonSocial);
            } else {
              this.formEdit.get('name').setValue(result.nombres);
              this.formEdit.get('documentType').setValue('01');
              this.formEdit.get('maternalSurname').setValue(result.materno);
              this.formEdit.get('paternalSurname').setValue(result.paterno);

            }
          });

        /*

      this.integrationService.getLandOwner(ubigeo, landOwnerCode)
        .toPromise().then(
          (result) => {
            this.formEdit.get('dni').setValue(result.document);
            if (result.documentType === '06') {
              this.formEdit.get('documentType').setValue(result.documentType);
              this.formEdit.get('descriptionOwner').setValue(result.businessName);
            } else {
              this.formEdit.get('name').setValue(result.nane);
              this.formEdit.get('documentType').setValue('01');
              this.formEdit.get('maternalSurname').setValue(result.maternalSurname);
              this.formEdit.get('paternalSurname').setValue(result.paternalSurname);

            }
          });
          */
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
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    this.formEdit.get('ubigeo').setValue(this.ubigeo);
  }

  ngOnDestroy(): void {
    this.formEdit?.reset();
  }

  private cleanBeforeSearch(): void {
    this.formEdit.get('documentType').setValue('01');
    this.formEdit.get('dni').setValue('');
    this.formEdit.get('name').setValue('');
    this.formEdit.get('maternalSurname').setValue('');
    this.formEdit.get('paternalSurname').setValue('');
    this.formEdit.get('descriptionOwner').setValue('');
  }
}
