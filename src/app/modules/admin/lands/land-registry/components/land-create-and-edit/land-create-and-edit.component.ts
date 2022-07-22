import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';
import { LandRegistryMapService } from '../../services/land-registry-map.service';

@Component({
  selector: 'app-land-create-and-edit',
  templateUrl: './land-create-and-edit.component.html',
  styleUrls: ['./land-create-and-edit.component.scss']
})
export class LandCreateAndEditComponent implements OnInit {

  @Output() showFormEdit = new EventEmitter<boolean>();
  formEdit: FormGroup;
  landRecord: LandRegistryMap;

  constructor(
    private readonly fb: FormBuilder,
    private landRegistryMapService: LandRegistryMapService,
  ) { }

  ngOnInit(): void {
    this.landRegistryMapService.landIn$
    .subscribe((result) => {
      this.landRecord = result;
      this.createFormEdit();
    });
  }

  emitShowFormEdit(): void{
    this.showFormEdit.emit(true);
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
      ubigeo: [this.landRecord?.ubigeo],
      uuType: [this.landRecord?.uuType],
      codUu: [this.landRecord?.codUu],
      habilitacionName: [this.landRecord?.habilitacionName],
      codStreet: [this.landRecord?.codStreet],
      streetType: [this.landRecord?.streetType],
      streetName: [this.landRecord?.streetName],
      urbanMza: [this.landRecord?.urbanMza],
      urbanLotNumber: [this.landRecord?.urbanLotNumber],
      block: [this.landRecord?.block],
      indoor: [this.landRecord?.indoor],
      floor: [this.landRecord?.floor],
      km: [this.landRecord?.km],
      latitude: [this.landRecord?.latitude],
      longitude: [this.landRecord?.longitude],
    });
  }

}
