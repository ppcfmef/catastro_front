import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-done',
  templateUrl: './ticket-done.component.html',
  styleUrls: ['./ticket-done.component.scss']
})
export class TicketDoneComponent implements OnInit {

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
            state:1,
        },
        {
            tipo:1,
            codCase: '00987',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1,
        },
        {
            tipo:2,
            codCase: '2010525888',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926',
            state:1,
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
