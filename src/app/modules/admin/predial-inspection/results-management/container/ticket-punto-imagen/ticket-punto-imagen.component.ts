import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-punto-imagen',
  templateUrl: './ticket-punto-imagen.component.html',
  styleUrls: ['./ticket-punto-imagen.component.scss']
})
export class TicketPuntoImagenComponent implements OnInit {

    data = {
        dni: 48556932,
        name: 'Mario Palomino Pancca',
        email: 'mario@gmail.com',
        phone: '985622230'
    };
  constructor() { }

  ngOnInit(): void {
  }

}
