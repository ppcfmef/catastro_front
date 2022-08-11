import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryMapModel } from '../../models/land-registry-map.model';
import { LandRegistryService } from '../../services/land-registry.service';

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnChanges {

  @Input() ownerId: number;
  @Input() landRecord: LandRegistryMap;
  @Input() landMapRecord: LandRegistryMap;
  @Output() showFormEdit = new EventEmitter<boolean>();
  landMergeRecord: LandRegistryMap;
  formEdit: FormGroup;
  title: string;
  isEdit = false; //evalua si es para editar o añadir predio

  constructor(
    private readonly fb: FormBuilder,
    private landRegistryService: LandRegistryService,
    private alert: MessageProviderService,
  ) { }

  emitShowFormEdit(): void{
    this.showFormEdit.emit(false);
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      id: [this.landMergeRecord?.id],
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
      latitude: [this.landMergeRecord?.latitude],
      longitude: [this.landMergeRecord?.longitude],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const landCurentValue = changes?.landMapRecord?.currentValue;
    if (landCurentValue) {
      this.mergeRecords(landCurentValue);
    }else {
      this.landMergeRecord = this.landRecord;
    }
    // Generar el texto del titulo e icono en funcion de evento
    if(this.isEdit){
      this.title = 'Editar Predio';
    }else{
      this.title = 'Añadir Predio';
    }

    this.createFormEdit();
  }

  saveLand(): void {
    if(this.formEdit.valid) {
      const data = this.formEdit.value;
      data.owner = this.ownerId;
      this.landRegistryService.saveLand(data)
      .subscribe(result => console.log(result));
    }else {
      this.alert.showSnackError('Error al guardar predio');
    }
  }

  private mergeRecords(landCurentValue: LandRegistryMapModel): void {
    if (this.landRecord) {
      this.landMergeRecord = this.landRecord;
      this.landMapRecord = landCurentValue;
      for (const key in this.landMapRecord) {
        if (this.landMapRecord[key]) {
          this.landMergeRecord[key] = this.landMapRecord[key];
        }
      }
    }else {
      this.landMergeRecord = landCurentValue;
    }
  }

}
