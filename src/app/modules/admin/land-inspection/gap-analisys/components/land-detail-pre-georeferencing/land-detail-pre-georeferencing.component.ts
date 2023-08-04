import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LandAnalisysUI } from '../../interfaces/land.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionsGapAnalisys } from 'app/shared/enums/actions-gap-analisys.enum';

@Component({
  selector: 'app-land-detail-pre-georeferencing',
  templateUrl: './land-detail-pre-georeferencing.component.html',
  styleUrls: ['./land-detail-pre-georeferencing.component.scss']
})
export class LandDetailPreGeoreferencingComponent implements OnInit {
  @Input() land: LandAnalisysUI;

  @Output() asigLandEvent: EventEmitter<any> = new EventEmitter<any>();

  showAddres = true;
  formEdit: FormGroup;


  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    console.log('land>>>',this.land);
    this.createFormEdit();
  }

  createFormEdit(): void{
    this.formEdit = this.fb.group({
        referenceName: [ this.land?.referenceName],
    });

  }

  saveLandNoReference(): void{
  }

  newPointImg(): void {
    this.asigLandEvent.emit(ActionsGapAnalisys.NUEVO_PUNTO_REFERENCIA);
  }

  asigLand(): void {
    this.asigLandEvent.emit(ActionsGapAnalisys.ASIGNAR_PREDIO);
  }
}
