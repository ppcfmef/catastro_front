import { Component, OnInit } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-ticket-base',
  templateUrl: './ticket-base.component.html',
  styleUrls: ['./ticket-base.component.scss']
})
export class TicketBaseComponent implements OnInit {

    data = {
        dni: 48556932,
        name: 'Mario Palomino Pancca',
        email: 'mario@gmail.com',
        phone: '985622230'
    };

    //este componente es para los casos punto de imagen y predio sin geo para predios sin geo accept debe ser true ;
    accept: boolean = true;

    hidden: boolean = true;
  constructor(
    private _messageProviderService: MessageProviderService,
    ) { }


  ngOnInit(): void {
  }

  add(): void {
    this.hidden = false;
  }

  obsTicket(): void {
    this._messageProviderService.showModal(ModalComponent,{width:430} );
  }

  action(): void {
    if(this.accept){
        console.log('generar punto de imagen');
    }else {
        console.log('validar ubicacion');
    }
  }
  actionTwo(): void {
    if(this.accept){
        console.log('Generar predio');
    }else {
        console.log('Nueva dirección');
    }
  }
}
