import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { UbicacionService } from '../../services/ubicacion.service';
import { User } from 'app/core/user/user.types';
import { TicketStatus } from 'app/shared/enums/ticket-status.enum';
import { CFTicketService } from '../../services/cfticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnDestroy {
    @Input() ubigeo: string;
    user: User;
  _unsubscribeAll: Subject<any> = new Subject<any>();
  ticket: ITicket;
  //typeGap=TypeGap;
  appTicketBaseShow= false;
  appTicketShow= false;
  totalUbicaciones: number;
  ubicaciones: any[];
  openLocation: boolean = true;
  ubicacion: IUbicacion;
constructor(
  private _router: Router,
  private _activatedRoute: ActivatedRoute,
  private _ticketService: TicketService,
  private _resultsService: ResultsService,
  private _ubicacionService: UbicacionService,
  private _cfTicketService: CFTicketService
) {
}

ngOnInit(): void {


  this._activatedRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
          this.getDataTicket(params.id);
      });

      this.ubigeo=localStorage.getItem('ubigeo')?localStorage.getItem('ubigeo'):null;
      this.user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
}

getDataTicket(idTicket: string): void{
  this._ticketService.get2(idTicket).subscribe( (res: ITicket) =>{
      this.ticket=res;
      this.ubigeo=this.ticket.codTicket.substring(1,7);
      console.log('module ticket this.ticket>>>', this.ticket);
      this.totalUbicaciones =res.ubicaciones.length;
      this.ubicaciones = res.ubicaciones.map((data: IUbicacion,index: number)=> {
          const registroTitularidad: IRegistroTitularidad[] =data.registrosTitularidad;
          let totalCase = 0;

          registroTitularidad.map((registro)=>{
              totalCase = totalCase + ((registro.predioInspeccion)?1:0);
              totalCase = totalCase + ((registro.suministro)?1:0);
              });
          const r: any={
              id: (index+1),
              codUbicacion : data.codUbicacion,
              totalCase: totalCase,
              state: data.status,
          };
          return r;
      });

      if([TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTO_IMAGEN,TypeGap.PUNTOS_LOTE_SIN_PREDIO,TypeGap.PREDIO_SUBVALUADO].includes( this.ticket.codTipoTicket) ) {

        this.openLocation= true;
        console.log('this.openLocation>>>', this.openLocation);

       /* if(res.ubicaciones && res.ubicaciones.length>0)
            {this.ubicacion = res.ubicaciones[0];}*/

        }

        else {
            this.openLocation= false;
        }
  });




}

ngOnDestroy(): void {
  this._unsubscribeAll.next(null);
  this._unsubscribeAll.complete();
}


navegateTo(): void {
  this._router.navigate(['land-inspection/results-management/'] );
}


eventOpenLocation(event: any): void {
  this.openLocation = event.openLocation;
  const codUbicacion = event.codUbicacion;
    console.log('codUbicacion>>>',codUbicacion);
    console.log('this.openLocation>>>',this.openLocation);
    if(codUbicacion){
        this._ubicacionService.get2(codUbicacion).subscribe( (data: IUbicacion) =>{

            this.ubicacion =data;
            this._resultsService.setUbicacionData({ubicacion:this.ubicacion,ticket:this.ticket});
          });
    }

};


actualizarCFTicket(codTicket: string, estado: any): void{
    console.log('actualizarCFTicket...');
    this._cfTicketService.getTicket({'COD_TICKET':codTicket, 'ESTADO_V':1}).then((responseJson)=>{
        console.log('responseJson>>',responseJson);
        if (responseJson && responseJson.features) {
            const features: any[] = responseJson.features;

            const id=features[0].attributes['OBJECTID'];

            this._cfTicketService.updateTicket({'OBJECTID':id, 'ESTADO':estado}).then((response)=>{
                console.log('return actualizar CF Ticket',response);
            });
        }

    });

}


/*
updateIicket(ticket: ITicket): void{
    const cantTotalResueltos = ticket.ubicaciones.filter(u=> u.status !== TicketStatus.PENDIENTE_GESTION_RESULTADOS).length;
    const cantUbiAprob= ticket.ubicaciones.filter(u=> u.status ===TicketStatus.RESUELTO_GESTION_RESULTADOS).length;
    const cantUbiObs= ticket.ubicaciones.filter(u=> u.status ===TicketStatus.OBSERVADO_GESTION_RESULTADOS).length;
    const totalUbicaciones =ticket.ubicaciones.length;
    console.log('totalUbicaciones',totalUbicaciones);
    console.log('cantUbiObs',cantUbiObs);
    console.log('cantUbiAprob',cantUbiAprob);
    if( cantTotalResueltos === totalUbicaciones ){
      if(cantUbiObs> 0){
        ticket.codEstTrabajoTicket = String(TicketStatus.OBSERVADO_GESTION_RESULTADOS);
      }
      else if(cantUbiAprob === totalUbicaciones){
        ticket.codEstTrabajoTicket = String(TicketStatus.RESUELTO_GESTION_RESULTADOS);
      }

      this._ticketService.update(ticket.codTicket,{codEstTrabajoTicket:this.ticket.codEstTrabajoTicket}).subscribe(r=>{

        this.actualizarCFTicket(this.ticket.codTicket,TicketStatus.OBSERVADO_GESTION_RESULTADOS);
        this._router.navigate([
          './land-inspection/results-management',
          ]);
      });

    }

  }
*/



updateTicket(ticket: ITicket): void{

    const cantTotalResueltos = ticket.ubicaciones.filter(u=> u.status !==0).length;
    const cantUbiAprob= ticket.ubicaciones.filter(u=> u.status ===TicketStatus.RESUELTO_GESTION_RESULTADOS).length;
    const cantUbiObs= ticket.ubicaciones.filter(u=> u.status ===TicketStatus.OBSERVADO_GESTION_RESULTADOS).length;
    const totalUbicaciones =ticket.ubicaciones.length;

    console.log('cantUbiObs>>>',cantUbiObs);
    console.log('cantUbiAprob>>>',cantUbiAprob);
    console.log('cantTotalResueltos>>>',cantTotalResueltos);
    console.log('totalUbicaciones>>>',cantTotalResueltos);
    if( cantTotalResueltos === totalUbicaciones && cantTotalResueltos>0 ){
      if(cantUbiObs> 0){
        ticket.codEstTrabajoTicket = String(TicketStatus.OBSERVADO_GESTION_RESULTADOS);
      }
      else if(cantUbiAprob === totalUbicaciones){
        ticket.codEstTrabajoTicket = String(TicketStatus.RESUELTO_GESTION_RESULTADOS);
      }

      this._ticketService.update(ticket.codTicket,{codEstTrabajoTicket:this.ticket.codEstTrabajoTicket, nroNotificacion: this.ticket.nroNotificacion }).subscribe(r=>{
        /*se resetea el mapa a nivel de ticket */
        this.actualizarCFTicket(this.ticket.codTicket,ticket.codEstTrabajoTicket);
        this._router.navigate([
          './land-inspection/results-management',
          ]);
      });

    }

    else{
        this._resultsService.setUbicacionData({ubicacion:this.ubicacion,ticket:this.ticket});
    }

  }

eventUpdateLocation(event: any): void {
    //console.log('eventUpdateLocation>>>',event);
    const codUbicacion = event.codUbicacion;
      if(codUbicacion){
          this._ubicacionService.get2(codUbicacion).subscribe( (data: IUbicacion) =>{
              this.ubicacion =data;
              this._ticketService.get2(this.ticket.codTicket).subscribe((ticket)=>{
                this.ticket = ticket;
                if (this.ticket.codEstTrabajoTicket===String(TicketStatus.PENDIENTE_GESTION_RESULTADOS)){
                    this.updateTicket(this.ticket);
                }

              });

            });
      }

  };

  eventCloseLocation(event: any): void{
    this.openLocation = false;
    this.getDataTicket(this.ticket.codTicket);
  }
}

