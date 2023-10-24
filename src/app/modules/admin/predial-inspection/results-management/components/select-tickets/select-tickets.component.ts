import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class SelectTicketsComponent implements OnInit {

    @Input() ticket: ITicket;
    @Input() ubicaciones: any[];
    closeTrue = '';
    isOpen = false;
    itemSelect: any; //= 'Seleccione Ubicación';
    text ='Seleccione Ubicación';
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

      if(this.ticket.codTipoTicket === TypeGap.PREDIO_SIN_GEORREFERENCIACION || this.ticket.codTipoTicket === TypeGap.PUNTO_IMAGEN ) {
        this.closeTrue = 'closed';
        this.itemSelect= this.ubicaciones[0];
        this.navegateTo(this.itemSelect);
    }else if (this.ticket.codTipoTicket === TypeGap.PUNTOS_LOTE_SIN_PREDIO) {
        this.itemSelect= this.ubicaciones[0];
        this.navegateTo(this.itemSelect);
    }

    else{

    }

  }

  navegateTo(item: any): void {
    localStorage.setItem('idUbicacion', item.id);
    this.itemSelect =  item; //  `${item.id}. Ubicación`;
    this.text = `${item.id}. Ubicación`;
  }

    selectRoute(item): void {
      localStorage.setItem('idUbicacion', item.id);
      this.text = `${item.id}. Ubicación`;
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

}
