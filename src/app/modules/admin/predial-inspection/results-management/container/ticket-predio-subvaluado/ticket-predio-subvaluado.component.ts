import { Component, OnInit } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { PrevisualizacionComponent } from '../previsualizacion/previsualizacion.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-predio-subvaluado',
  templateUrl: './ticket-predio-subvaluado.component.html',
  styleUrls: ['./ticket-predio-subvaluado.component.scss']
})
export class TicketPredioSubvaluadoComponent implements OnInit {

  constructor(
    private _messageProviderService: MessageProviderService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => console.log(params, 'params'));

  }

  prev(): void {
    this._messageProviderService.showModal(PrevisualizacionComponent,{width:1100, height:720} );
  }
}
