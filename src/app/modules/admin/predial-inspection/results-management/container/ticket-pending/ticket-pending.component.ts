import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-pending',
  templateUrl: './ticket-pending.component.html',
  styleUrls: ['./ticket-pending.component.scss']
})
export class TicketPendingComponent implements OnInit {

    ticket = {
        cod:125,
        gap:'Punto imagen'
    };

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

    panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
