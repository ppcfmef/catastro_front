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
        gap:'predio sin geo',
        totalTicket: 6,
        ubicaciones: [
                        {
                            id:'001',
                            totalCase:4,
                            state:0,
                            detailCase: [
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
                            ],
                        },
                        {
                            id:'002',
                            totalCase:4,
                            state:0
                        },
                        {
                            id:'003',
                            totalCase:3,
                            state:0
                        },
                        {
                            id:'004',
                            totalCase:2,
                            state:0
                        },
                        {
                            id:'005',
                            totalCase:4,
                            state:1
                        },
                        {
                            id:'006',
                            totalCase:4,
                            state:1
                        }
            ]
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

