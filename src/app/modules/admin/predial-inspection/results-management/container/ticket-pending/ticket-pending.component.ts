import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-pending',
  templateUrl: './ticket-pending.component.html',
  styleUrls: ['./ticket-pending.component.scss']
})
export class TicketPendingComponent implements OnInit {

    ticket = {
        cod:125,
        gap:'Sin Geo',
        totalTicket: 6,
    };
  constructor(
    private _router: Router,
    private _activeRoure: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  navegateTo(): void {
    this._router.navigate(['land-inspection/results-management/'] );
  }
}

