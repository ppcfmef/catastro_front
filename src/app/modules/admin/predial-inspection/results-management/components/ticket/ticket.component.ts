import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
    estado = true;
    tickets =[
        {
            tipo:0,
            codCase: '00986',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926'
        },
        {
            tipo:1,
            codCase: '00987',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926'
        },
        {
            tipo:2,
            codCase: '2010525888',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926'
        },
        {
            tipo:3,
            codCase: '20158968552',
            firstname: 'Jhon',
            lastname:'Perez',
            dni:'44458926'
        },
    ];
  constructor() { }

  ngOnInit(): void {
  }
  add(): void {
    this.estado =false;
  }
}
