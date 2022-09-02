import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';

export const INACTIVE_STATUS = 3;

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
  @Output() registerLand = new EventEmitter<LandRegistryMap>();
  landMergeRecord: LandRegistryMap;
  formEdit: FormGroup;
  title: any;
  isEdit = false; //evalua si es para editar o añadir predio
  showCartographicImg = false;
  showPlot = false;
  masterDomain: MasterDomain;
  landActive = true;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly fb: FormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private landRegistryMapService: LandRegistryMapService,
  ) { }

  ngOnInit(): void {
      this.landRegistryService.getMasterDomain()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(result => this.masterDomain = result);
  }

  emitShowFormEdit(): void{
    this.formEdit.reset();
    setTimeout(() => {this.showFormEdit.emit(false);}, 1000);
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
      statusImg: [{ value: this.landMergeRecord?.statusImg, disabled}],
      cup: [{ value: this.landMergeRecord?.cup, disabled}],
      cpm: [{ value: this.landMergeRecord?.cpm, disabled}],
      ubigeo: [{ value: this.landMergeRecord?.ubigeo, disabled}],
      uuType: [{ value: this.landMergeRecord?.uuType, disabled}],
      codUu: [{ value: this.landMergeRecord?.codUu, disabled}],
      habilitacionName: [{ value: this.landMergeRecord?.habilitacionName, disabled}],
      codStreet: [{ value: this.landMergeRecord?.codStreet, disabled}],
      streetType: [{ value: this.landMergeRecord?.streetType, disabled}],
      streetName: [{ value: this.landMergeRecord?.streetName, disabled}],
      urbanMza: [{ value: this.landMergeRecord?.urbanMza, disabled}],
      urbanLotNumber: [{ value: this.landMergeRecord?.urbanLotNumber, disabled}],
      block: [{ value: this.landMergeRecord?.block, disabled}],
      indoor: [{ value: this.landMergeRecord?.indoor, disabled}],
      floor: [{ value: this.landMergeRecord?.floor, disabled}],
      km: [{ value: this.landMergeRecord?.km, disabled}],
      municipalNumber: [{ value: this.landMergeRecord?.municipalNumber, disabled}],
      apartmentNumber: [{ value: this.landMergeRecord?.apartmentNumber, disabled}],
      resolutionDocument: [{ value: this.landMergeRecord?.resolutionDocument, disabled}],
      resolutionType: [{ value: this.landMergeRecord?.resolutionType, disabled}],
      latitude: [{ value: this.landMergeRecord?.latitude, disabled}],
      longitude: [{ value: this.landMergeRecord?.longitude, disabled}],
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
    }

    this.createFormEdit();
  }

  saveLand(): void {
    if(this.formEdit.valid) {
      const data = this.formEdit.value;
      data.owner = this.ownerId;
      data.status = this.toggleToStatus(data.status);
      // ToDo: debe ser en el container
      if (data.idPlot && !data.cup) {
        this.landRegistryMapService.createCpu(data).toPromise()
        .then(result => this.saveLandApi(result));
      }else {
        this.saveLandApi(data);
      }
    }else {
      this.confirmationService.error(
        'Registro de predio',
        'Error al registrar el predio, intente nuevamente'
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private saveLandApi(data): void {
    this.landRegistryService.saveLand(data).toPromise()
      .then(
        (result) => {
          this.confirmationService.success(
            'Registro de predio',
            'Se registro el predio correctamente'
          );
          this.formEdit.reset();
          this.registerLand.emit(result);
        },
        (error) => {
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
    if (status === INACTIVE_STATUS) {
      return false;
    }
    return true;
  }

  private toggleToStatus(status: boolean): number {
    if (status) {
      return this.landMergeRecord?.status;
    }
    return INACTIVE_STATUS;
  }
}
