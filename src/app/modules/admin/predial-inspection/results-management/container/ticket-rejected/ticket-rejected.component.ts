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

    tickets =[
        {
            tipo:0,
            codCase: '00986',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:1,
            codCase: '00987',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:2,
            codCase: '2010525888',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:0,
        },
        {
            tipo:3,
            codCase: '20158968552',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1,
        },
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
