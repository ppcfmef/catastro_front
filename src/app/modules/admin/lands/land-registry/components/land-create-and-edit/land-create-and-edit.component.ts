import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomConfirmationService } from 'app/shared/services/custom-confirmation.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { MasterDomain } from '../../interfaces/master-domain.interface';

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnInit, OnChanges {

  @Input() ownerId: number;
  @Input() landRecord: LandRegistryMap;
  @Input() landMapRecord: LandRegistryMap;
  @Output() showFormEdit = new EventEmitter<boolean>();
  @Output() registerLand = new EventEmitter<LandRegistryMap>();
  landMergeRecord: LandRegistryMap;
  formEdit: FormGroup;
  title: string;
  isEdit = false; //evalua si es para editar o añadir predio
  showCartographicImg = false;
  showPlot = false;
  masterDomain: MasterDomain;

  constructor(
    private readonly fb: FormBuilder,
    private landRegistryService: LandRegistryService,
    private confirmationService: CustomConfirmationService,
    private landRegistryMapService: LandRegistryMapService,
  ) { }

  ngOnInit(): void {
      this.landRegistryService.getMasterDomain()
      .subscribe(result => this.masterDomain = result);
  }

  emitShowFormEdit(): void{
    this.formEdit.reset();
    setTimeout(() => {this.showFormEdit.emit(false);}, 1000);
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      id: [this.landMergeRecord?.id],
      idPlot: [this.landMergeRecord?.idPlot],
      idCartographicImg: [this.landMergeRecord?.idCartographicImg],
      statusImg: [this.landMergeRecord?.statusImg],
      cup: [this.landMergeRecord?.cup],
      cpm: [this.landMergeRecord?.cpm],
      ubigeo: [this.landMergeRecord?.ubigeo],
      uuType: [this.landMergeRecord?.uuType],
      codUu: [this.landMergeRecord?.codUu],
      habilitacionName: [this.landMergeRecord?.habilitacionName],
      codStreet: [this.landMergeRecord?.codStreet],
      streetType: [this.landMergeRecord?.streetType],
      streetName: [this.landMergeRecord?.streetName],
      urbanMza: [this.landMergeRecord?.urbanMza],
      urbanLotNumber: [this.landMergeRecord?.urbanLotNumber],
      block: [this.landMergeRecord?.block],
      indoor: [this.landMergeRecord?.indoor],
      floor: [this.landMergeRecord?.floor],
      km: [this.landMergeRecord?.km],
      municipalNumber: [this.landMergeRecord?.municipalNumber],
      apartmentNumber: [this.landMergeRecord?.apartmentNumber],
      resolutionDocument: [this.landMergeRecord?.resolutionDocument],
      resolutionType: [this.landMergeRecord?.resolutionType],
      latitude: [this.landMergeRecord?.latitude],
      longitude: [this.landMergeRecord?.longitude],
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
      // ToDo: debe ser en el container
      if (data.idPlot) {
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
    if(this.isEdit){
      this.title = 'Editar Predio';
    }else{
      this.title = 'Añadir Predio';
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

}
