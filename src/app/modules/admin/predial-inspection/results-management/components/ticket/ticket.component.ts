import { Component, OnInit } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

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
  constructor(
    private _messageProviderService: MessageProviderService,
  ) { }

  ngOnInit(): void {
  }
  add(): void {
    //
  }

  obsTicket(): void{
    this._messageProviderService.showModal(ModalComponent,{width:430} );
  }
}
