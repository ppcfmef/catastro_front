import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { ResultsService } from '../../services/results.service';
import { LandRegistryService } from 'app/modules/admin/lands/land-registry/services/land-registry.service';
import { Subject, takeUntil } from 'rxjs';
import { MasterDomain } from 'app/modules/admin/lands/land-registry/interfaces/master-domain.interface';

@Component({
  selector: 'app-dataland',
  templateUrl: './dataland.component.html',
  styleUrls: ['./dataland.component.scss']
})
export class DatalandComponent implements OnInit {
    @Input() ubicacion: IUbicacion;
    @Input() ubigeo: string;

    @Output() clickPosition: EventEmitter<any> = new EventEmitter();
    datosPredio = {
        ubigeo:'110501',
        hab:'Urb. San Juan Lurigancho',
        mz:'B',
        lote:'12',
        type: 'Avenida',
        name: 'Larco',
        numdoor: '158',
        address:'Avenida Larco'
    };
    masterDomain: MasterDomain;
    private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(  private _resultsService: ResultsService,
    private landRegistryService: LandRegistryService,

  ) {
    this.landRegistryService.getMasterDomain()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(result => this.masterDomain = result);

   }

  ngOnInit(): void {
    //console.log('this.ubicacion>>',this.ubicacion);
    this.datosPredio.ubigeo = this.ubigeo;
    this.datosPredio.hab = this.ubicacion.nomUU;
    this.datosPredio.mz = this.ubicacion.mznUrb;
    this.datosPredio.lote = this.ubicacion.lotUrb;
    this.datosPredio.type = this.masterDomain.codStreet.find(e=> e.id ===this.ubicacion.codTipVia)?.description;
    this.datosPredio.name = this.ubicacion.nomVia;
    this.datosPredio.numdoor = this.ubicacion.numMun;
    this.datosPredio.address = this.ubicacion.address;
    //this._resultsService.setUbicacionData(this.ubicacion);
  }

  onClickPosition(): void {
    this.clickPosition.emit(this.ubicacion);
    /*if(this.ubicacion){
      this._resultsService.setUbicacionData(this.ubicacion);
    }*/
  }

}
