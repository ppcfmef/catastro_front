import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dataland',
  templateUrl: './dataland.component.html',
  styleUrls: ['./dataland.component.scss']
})
export class DatalandComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
