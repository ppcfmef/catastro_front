import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-rejected',
  templateUrl: './ticket-rejected.component.html',
  styleUrls: ['./ticket-rejected.component.scss']
})
export class TicketRejectedComponent implements OnInit {
    ticket = {
        cod:125,
        gap:'Punto imagen'
    };
    comment =
    'Predio no encontrado ';
    panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
