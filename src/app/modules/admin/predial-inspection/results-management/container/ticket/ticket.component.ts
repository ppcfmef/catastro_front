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
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {

  _unsubscribeAll: Subject<any> = new Subject<any>();
  ticket: ITicket;
  //typeGap=TypeGap;
  appTicketBaseShow= false;
  appTicketShow= false;
  totalUbicaciones: number;
  ubicaciones: any[];
  openLocation: boolean = true;
constructor(
  private _router: Router,
  private _activatedRoute: ActivatedRoute,
  private _ticketService: TicketService,
  private _resultsService: ResultsService
) {
}

ngOnInit(): void {


  this._activatedRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
          this.getDataTicket(params.id);
      });

}

getDataTicket(idTicket: number): void{
  this._ticketService.get(idTicket).subscribe( (res: ITicket) =>{
      this.ticket=res;
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
          };
          return r;
      });
  });


  if([TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTO_IMAGEN,TypeGap.PUNTOS_LOTE_SIN_PREDIO,TypeGap.PREDIO_SUBVALUADO].includes( this.ticket.codTipoTicket) ) {

    this.openLocation= true;
  }else {
      this.openLocation= false;
  }

}

ngOnDestroy(): void {
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}


navegateTo(): void {
  this._router.navigate(['land-inspection/results-management/'] );
}


eventOpenLocation(event: any): void {
  this.openLocation = event;
};
}

