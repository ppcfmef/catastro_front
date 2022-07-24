import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnChanges {

  @Input() landRecord: LandRegistryMap;
  @Input() landMapRecord: LandRegistryMap;
  @Output() showFormEdit = new EventEmitter<boolean>();
  landMergeRecord: LandRegistryMap;
  formEdit: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  emitShowFormEdit(): void{
    this.showFormEdit.emit(false);
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
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
    if (changes?.landMapRecord?.currentValue) {
      // mergear los valores aceptando
      this.landMergeRecord = this.landRecord;
      for (const key in this.landMapRecord) {
        if (this.landMapRecord[key]) {
          this.landMergeRecord[key] = this.landMapRecord[key];
        }
      }
      this.landMergeRecord = this.landMapRecord;
    }else {
      this.landMergeRecord = this.landRecord;
    }
    this.createFormEdit();
  }

}
