import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-pending',
  templateUrl: './ticket-pending.component.html',
  styleUrls: ['./ticket-pending.component.scss']
})
export class TicketPendingComponent implements OnInit, OnDestroy {

    _unsubscribeAll: Subject<any> = new Subject<any>();
    ticket = {
        cod:'125',
        gap:'Sin Geo',
        totalTicket: 6,
    };
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.params
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((ticket) => {
            console.log(ticket, 'ticket');
            this.ticket.cod = ticket.id;
        });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
}
  navegateTo(): void {
    this._router.navigate(['land-inspection/results-management/'] );
  }
}

