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
    panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
