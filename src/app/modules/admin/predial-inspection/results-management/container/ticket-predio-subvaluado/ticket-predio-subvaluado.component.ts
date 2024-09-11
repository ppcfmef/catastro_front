import { Component, inject, OnInit } from '@angular/core';
import { MessageProviderService } from 'app/shared/services/message-provider.service';
import { ActivatedRoute } from '@angular/router';
import { CheckTicketService } from '../../services/check-ticket.service';

@Component({
  selector: 'app-ticket-predio-subvaluado',
  templateUrl: './ticket-predio-subvaluado.component.html',
  styleUrls: ['./ticket-predio-subvaluado.component.scss']
})
export class TicketPredioSubvaluadoComponent implements OnInit {

    checkTicketService = inject(CheckTicketService);
  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => console.log(params, 'params'));

  }

}
