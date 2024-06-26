import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { MessageProviderService } from 'app/shared/services/message-provider.service';

export enum LandStatus {
  withOutMapping = 0,
  withMapping = 1,
  withMappingImg = 2,
  inactive = 3
}

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnInit, OnChanges, OnDestroy {

  @Input() ownerId: number;
  @Input() landRecord: LandRegistryMap;
  @Input() landMapRecord: LandRegistryMap;
  @Output() showFormEdit = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<boolean>(false);
  @Output() registerLand = new EventEmitter<LandRegistryMap>();
  landMergeRecord: LandRegistryMap;
  formEdit: FormGroup;
  title: any;
  isEdit = false; //evalua si es para editar o añadir predio
  showCartographicImg = false;
  showPlot = false;
  masterDomain: MasterDomain;
resolutionType: any[];
  landActive = true;
  hideInfoFields = false;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly fb: UntypedFormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private _landRegistryMapService: LandRegistryMapService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _messageProviderService: MessageProviderService,

  ) {

    this.landRegistryService.getMasterDomain()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((result) =>{
      this.masterDomain = result;

      this.resolutionType =this.masterDomain.resolutionType.filter((r)=>r.id !== '4');

    } 

    );}

  get f(): {[key: string]: AbstractControl} {
    return this.formEdit.controls;
  }
  ngOnInit(): void {
      this.landRegistryService.getMasterDomain()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((result) => {
        this.masterDomain = result;
    });
  }

  emitShowFormEdit(): void{
    this.formEdit.reset();
    this.showFormEdit.emit(false);
  }

  destroyForm(): void {
    this.showFormEdit.emit(null);
    this._landRegistryMapService.setEventCancel(true);
    /*this.cancelEvent.emit(true);*/

  }

  createFormEdit(): void{
    this.landActive = this.statusToToggle(this.landMergeRecord?.status);
    const disabled = !this.landActive;
    this.formEdit = this.fb.group({
      idObjectImg:[{ value: this.landMergeRecord?.idObjectImg, disabled}],
      id: [{ value: this.landMergeRecord?.id, disabled}],
      idPlot: [{ value: this.landMergeRecord?.idPlot, disabled}],
      idCartographicImg: [{ value: this.landMergeRecord?.idCartographicImg, disabled}],
      status: [{ value: this.landActive, disabled}],
      inactiveReason: [{ value: this.landMergeRecord?.inactiveReason, disabled}],
      statusImg: [{ value: this.landMergeRecord?.statusImg, disabled}],
      cup: [{ value: this.landMergeRecord?.cup, disabled: (this.landMergeRecord?.cup)?true:disabled}],
      cpm: [{ value: this.landMergeRecord?.cpm, disabled}],
      ubigeo: [{ value: this.landMergeRecord?.ubigeo, disabled:(this.landMergeRecord?.ubigeo)?true:disabled}],
      uuType: [{ value: this.landMergeRecord?.uuType, disabled: !! this.landMergeRecord?.uuType}],
      codUu: [{ value: this.landMergeRecord?.codUu, disabled}],
      habilitacionName: [{ value: this.landMergeRecord?.habilitacionName, disabled: (this.landMergeRecord?.habilitacionName)?true:disabled}],
      codStreet: [{ value: this.landMergeRecord?.codStreet, disabled:(this.landMergeRecord?.codStreet)?true:disabled }],
      streetType: [{ value: this.landMergeRecord?.streetType, disabled:(this.landMergeRecord?.streetType)?true:disabled}],
      streetName: [{ value: this.landMergeRecord?.streetName, disabled: (this.landMergeRecord?.streetName)?true:disabled}],
      urbanMza: [{ value: this.landMergeRecord?.urbanMza, disabled: (this.landMergeRecord?.urbanMza)?true:disabled }],
      urbanLotNumber: [{ value: this.landMergeRecord?.urbanLotNumber, disabled:(this.landMergeRecord?.urbanLotNumber)?true:disabled }],
      block: [{ value: this.landMergeRecord?.block, disabled:(this.landMergeRecord?.block)?true:disabled }],
      indoor: [{ value: this.landMergeRecord?.indoor, disabled:(this.landMergeRecord?.indoor)?true:disabled }],
      floor: [{ value: this.landMergeRecord?.floor, disabled :(this.landMergeRecord?.floor)?true:disabled }],
      km: [{ value: this.landMergeRecord?.km, disabled:(this.landMergeRecord?.km)?true:disabled  }],
      municipalNumber: [{ value: this.landMergeRecord?.municipalNumber, disabled:  (this.landMergeRecord?.municipalNumber)?true:disabled }],
      municipalNumberAlt: [{ value: this.landMergeRecord?.municipalNumberAlt, disabled}],
      apartmentNumber: [{ value: this.landMergeRecord?.apartmentNumber, disabled: (this.landMergeRecord?.apartmentNumber)?true:disabled }],
      // eslint-disable-next-line max-len
      resolutionDocument: [{ value: this.landMergeRecord?.resolutionDocument, disabled:(this.landMergeRecord?.resolutionDocument)?true:disabled },[Validators.required, this.noWhitespaceValidator]],
    //   resolutionType: [{ value: this.landMergeRecord?.resolutionType, disabled:(this.landMergeRecord?.resolutionType)? true:disabled  }],
      resolutionType: [{ value: this.landMergeRecord?.resolutionType, disabled: !!this.landMergeRecord?.resolutionType }, Validators.required],
      latitude: [{ value: this.landMergeRecord?.latitude, disabled:(this.landMergeRecord?.latitude)? true:disabled}],
      longitude: [{ value: this.landMergeRecord?.longitude, disabled :(this.landMergeRecord?.longitude)? true:disabled }],
      rangCup:[{ value: this.landMergeRecord?.rangCup, disabled: (this.landMergeRecord?.rangCup)? true:disabled }],
      latitudePuerta: [ this.landMergeRecord?.latitudePuerta],
      longitudePuerta: [ this.landMergeRecord?.longitudePuerta],
      idLotePuerta: [this.landMergeRecord?.idLotePuerta],
      loteUrbanoPuerta: [this.landMergeRecord?.loteUrbanoPuerta],
      manzanaUrbanaPuerta: [this.landMergeRecord?.manzanaUrbanaPuerta],
      idLoteP: [this.landMergeRecord?.idLoteP],
    });
    this.setTitle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const landCurentValue = changes?.landMapRecord?.currentValue;
    if (landCurentValue) {
      // Si la data es enviada por el mapa
      this.landMergeRecord = this.mergeRecords(landCurentValue);
      this.setShowCartographicImg();
      this.setShowPlot();
    }else {
      // si la data es enviada al crear o editar
      this.landMergeRecord = this.landRecord;
      this.isEdit = this.landMergeRecord ? true : false;
      this.showCartographicImg = false;
      this.hideInfoFields = false;
    }

    this.createFormEdit();
  }

  saveLand(): void {

    if(this.formEdit.valid) {
        // Habilitar todos los campos deshabilitados en el formulario
        Object.keys(this.formEdit.controls).forEach((controlName) => {
        this.formEdit.get(controlName).enable();
        });
        const data = this.formEdit.value;
        data.owner = this.ownerId;
        data.status = this.toggleToStatus(data.status);
        // this.showFormEdit.emit(false);
        // ToDo: debe ser en el container
        if (data.idPlot && !data.cup) {
        this._fuseSplashScreenService.show();
        this._landRegistryMapService.createCpu(data).toPromise()
        .then((result) => {
            result.origen= 'registro_predios';
            this.saveLandApi(result);
        });
        }else {
        this._fuseSplashScreenService.show();
        this.saveLandApi(data);
        }

    }else {
        // eslint-disable-next-line max-len
        const message = (!this.formEdit.get('resolutionType').value && !this.formEdit.get('resolutionDocument').value )? 'Error al registrar el predio. Es obligatorio ingresar el Tipo Doc. Sustento y Nro. Doc. Sustento.'
        :!this.formEdit.get('resolutionType').value ? 'Error al registrar el predio. Es obligatorio ingresar el Tipo Doc. Sustento'
        // eslint-disable-next-line max-len
        :!this.formEdit.get('resolutionDocument').value ? 'Error al registrar el predio. Es obligatorio ingresar el Nro. Doc. Sustento':' Error al registrar el predio. Ingresar campos requeridos';

        this._messageProviderService.showAlert(
          `${message}.`
        );
    }
    }

  onToggleStatus(value: MatSlideToggleChange): void {
    if (!value.checked) {
      const dialogRef = this.confirmationService.error(
        'Estado del predio',
        'Desea cambiar el estado de predio a inactivo, al inactivar un predio no podra activarlo nuevamente'
      );

      dialogRef.afterClosed().toPromise().then((option) => {
        if (option === 'confirmed') {
          this.hideInfoFields = true;
        }else {
          this.formEdit.get('status').setValue(true);
        }
      });
    }else {
      this.hideInfoFields = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  searchLandByCPU(): void {
    const cup = this.formEdit.get('cup').value;
    this.landRegistryService.getLandInactiveByCpu(cup)
      .toPromise().then(
        (result) => {
          result.id = null;
          result.status = LandStatus.withMapping;
          result.inactiveReason = null;
          this.landRecord = result;
          this.landMergeRecord = this.mergeRecords(this.landRecord);
          this.isEdit = this.landMergeRecord ? true : false;
          this.showCartographicImg = false;
          this.hideInfoFields = false;
          this.createFormEdit();
        }
      );
  }


  private resetForm(): void {
    this.formEdit.reset();
    this.hideInfoFields = false;
    this.isEdit = false;
    this.setTitle();
  }

  private saveLandApi(data): void {
    this.landRegistryService.saveLand(data).toPromise()
      .then(
        (result) => {
          result.id = data.id;
           this._landRegistryMapService.landIn = result;
            this._fuseSplashScreenService.hide();
          this.confirmationService.success(
            'Registro de predio',
            'Se registro el predio correctamente'
          );

          this.resetForm();
          this.registerLand.emit(result);
          setTimeout(() => {this.showFormEdit.emit(false);}, 1000);
        },
        (error) => {
            this._fuseSplashScreenService.hide();
          this.confirmationService.error(
            'Registro de predio',
            'Error al registrar el predio, intente nuevamente'
          );
        }
      );
  }

  private mergeRecords(landCurentValue: LandRegistryMap): LandRegistryMap {
    if (this.landRecord) {
      const landMergeRecord = this.landRecord;
      // this.landMapRecord = landCurentValue;
      for (const key in landCurentValue) {
        if (landCurentValue[key]) {
          landMergeRecord[key] = landCurentValue[key];
        }
      }
      return landMergeRecord;
    }

    return landCurentValue;
  }

  private setTitle(): void {
    // Generar el texto del titulo e icono en funcion de evento
    if(this.isEdit && this.landActive){
      this.title = {text: 'Editar Predio', icon: 'mat_solid:edit'};
    }
    else if(this.isEdit && !this.landActive) {
      this.title = {text: 'Predio Inactivo', icon: 'mat_solid:remove_circle_outline'};
    }
    else{
      this.title = {text: 'Añadir Predio', icon: 'mat_solid:library_add'};
    }
  }

  private setShowCartographicImg(): void {
    if (this.landMergeRecord.idCartographicImg && !this.landMergeRecord.idPlot) {
      this.showCartographicImg = true;
    }
  }

  private setShowPlot(): void {
    if (this.landMergeRecord.idPlot) {
      this.showPlot = true;
    }
  }

  private statusToToggle(status: number): boolean {
    if (status === LandStatus.inactive) {
      return false;
    }
    return true;
  }

  private toggleToStatus(status: boolean): number {
    if (status && this.landMergeRecord?.idPlot) {
      return LandStatus.withMapping;
    }
    else if (status && this.landMergeRecord?.idCartographicImg) {
      return LandStatus.withMappingImg;
    }
    else if (!status) {
      return LandStatus.inactive;
    }
    return 0;
  }

  private noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    if ((control.value || '').trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
}
