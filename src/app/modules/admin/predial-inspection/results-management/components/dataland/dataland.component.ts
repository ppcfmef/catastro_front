import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-dataland',
  templateUrl: './dataland.component.html',
  styleUrls: ['./dataland.component.scss']
})
export class DatalandComponent implements OnInit {
    @Input() ubicacion: IUbicacion;


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
  constructor(  private _resultsService: ResultsService) { }

  ngOnInit(): void {
    //console.log('this.ubicacion>>',this.ubicacion);
    this.datosPredio.ubigeo = this.ubicacion.ubigeo;
    this.datosPredio.hab = this.ubicacion.nomUU;
    this.datosPredio.mz = this.ubicacion.mznUrb;
    this.datosPredio.lote = this.ubicacion.lotUrb;
    this.datosPredio.type = this.ubicacion.codTipVia;
    this.datosPredio.name = this.ubicacion.nomVia;
    this.datosPredio.numdoor = this.ubicacion.numMun;
    this.datosPredio.address = this.ubicacion.nomVia;
    //this._resultsService.setUbicacionData(this.ubicacion);
  }

  onClickPosition(): void {
    this.clickPosition.emit(this.ubicacion);
    /*if(this.ubicacion){
      this._resultsService.setUbicacionData(this.ubicacion);
    }*/
  }

}
