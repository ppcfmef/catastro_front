import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { state } from '@angular/animations';
import { BreadCrumbsComponent } from '../../../../../../shared/components/bread-crumbs/bread-crumbs.component';
import { TypeGap } from 'app/shared/enums/type-gap.enum';
import { ITicket } from '../../interfaces/ticket.interface';
import { IUbicacion } from '../../interfaces/ubicacion.interface';
import { IRegistroTitularidad } from '../../interfaces/registro-titularidad.interface';


@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.component.html',
  styleUrls: ['./select-tickets.component.scss']
})
export class SelectTicketsComponent implements OnInit,OnChanges {

    @Input() ticket: ITicket;
    @Input() ubicaciones: any[];
    @Input() openLocation: boolean = true;
    @Output() eventOpenLocation: EventEmitter<any> = new EventEmitter() ;
    closeTrue = '';
    isOpen = false;
    itemSelect: any; //= 'Seleccione Ubicación';
    text ='Seleccione Ubicación';

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) { }
    ngOnChanges(changes: SimpleChanges): void {
        console.log('this.ticket select-tickets>>',this.ticket);
    }

  ngOnInit(): void {
    console.log('this.openLocation>>>',this.openLocation);
    //console.log('this.ticket select-tickets>>',this.ticket);
      if(
        [TypeGap.PREDIO_SIN_GEORREFERENCIACION,TypeGap.PUNTO_IMAGEN,TypeGap.PUNTOS_LOTE_SIN_PREDIO,TypeGap.PREDIO_SUBVALUADO].includes( this.ticket.codTipoTicket)
        ) {
        //this.closeTrue = 'closed';
        this.itemSelect= this.ubicaciones[0];
        this.navegateTo(this.itemSelect);
        /*this.openLocation= true;*/
    }

    /*else if (this.ticket.codTipoTicket === TypeGap.PUNTOS_LOTE_SIN_PREDIO) {
        this.itemSelect= this.ubicaciones[0];
        this.navegateTo(this.itemSelect);
    }*/

    else{
      /*this.openLocation= false;*/
    }

  }

  navegateTo(item: any): void {
    //localStorage.setItem('codUbicacion', item.codUbicacion);
    this.itemSelect =  item; //  `${item.id}. Ubicación`;
    this.text = `${item.id}. Ubicación ${item.codUbicacion}`;
    this.openLocation = true;
    console.log({openLocation:this.openLocation,codUbicacion:item.codUbicacion});
    this.eventOpenLocation.emit({openLocation:this.openLocation,codUbicacion:item.codUbicacion});
  }

    selectRoute(item): void {
      localStorage.setItem('codUbicacion', item.codUbicacion);
      this.text = `${item.id}. Ubicación ${item.codUbicacion}`;
        /*switch (this.ticket.codTipoTicket) {
            case TypeGap.PREDIO_SIN_GEORREFERENCIACION:
                //this._router.navigate(['ticket'] , {relativeTo: this._activeRoute});
            break;
            case TypeGap.PUNTO_IMAGEN:
                //this._router.navigate(['ticket'] , {relativeTo: this._activeRoute});
            break;

            case TypeGap.PUNTOS_LOTE_SIN_PREDIO:
                //this._router.navigate(['predio'] , {relativeTo: this._activeRoute});
            break;
            case 'predio subvaluado':
                //this._router.navigate([`sub/${item}`] , {relativeTo: this._activeRoute});
            break;
        }*/
    }


    opened(event: any): void{
      //console.log('event>>',event);
      this.openLocation = false;
      this.eventOpenLocation.emit({openLocation:this.openLocation,codUbicacion:null});
    }

}
