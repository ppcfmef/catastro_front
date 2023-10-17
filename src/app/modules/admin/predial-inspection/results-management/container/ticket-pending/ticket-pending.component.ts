import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from '../../services/ticket.service';
import { ITicket } from '../../interfaces/ticket.interface';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';
import { TypeGap } from 'app/shared/enums/type-gap.enum';

@Component({
  selector: 'app-ticket-pending',
  templateUrl: './ticket-pending.component.html',
  styleUrls: ['./ticket-pending.component.scss']
})
export class TicketPendingComponent implements OnInit, OnDestroy {

    _unsubscribeAll: Subject<any> = new Subject<any>();
    dataTicket: ITicket;
    /*ticket = {
        cod:'125',
        gap:'predio sin geo',
        codTipoTicket:1,
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
    };*/


    ticket: ITicket;
    typeGap=TypeGap;
    appTicketBaseShow= false;
    appTicketShow= false;
    totalUbicaciones: number;
    ubicaciones: any[];
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _ticketService: TicketService,

  ) {
  }

  ngOnInit(): void {


    this._activatedRoute.params
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((params) => {
            /*this.idTicket =params.id;*/
            this.getDataTicket(params.id);
        });

  }

  getDataTicket(idTicket: number): void{
    this._ticketService.get(idTicket).subscribe( (res: ITicket) =>{
        //console.log('res>>>',res);

        /*this.dataTicket = res;*/

        this.ticket=res;

        /*this.ticket.cod=res.codTicket;
        this.ticket.codTipoTicket=res.codTipoTicket;
        this.ticket.gap= res.tipoTicket;
        this.ticket.totalTicket = res.ubicacion.length;*/
        this.totalUbicaciones =res.ubicacion.length;
        this.ubicaciones = res.ubicacion.map((data: IUbicacion)=> {
            const registroTitularidad: IRegistroTitularidad[] =data.registroTitularidad;
            let totalCase = 0;
            registroTitularidad.map((registro)=>{
                totalCase = totalCase + ((registro.predio)?1:0);
                totalCase = totalCase + ((registro.suministro)?1:0);
                });
            const r: any={
                id:data.id,
                codUbicacion : data.codUbicacion,
                totalCase: totalCase,
                state: data.estado,
                /*detailCase:[],*/
            };
            return r;
        });

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

