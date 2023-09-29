import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { state } from '@angular/animations';
import { BreadCrumbsComponent } from '../../../../../../shared/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-select-tickets',
  templateUrl: './select-tickets.component.html',
  styleUrls: ['./select-tickets.component.scss']
})
export class SelectTicketsComponent implements OnInit {

    @Input() ticket: any;
    closeTrue = '';
    isOpen = false;
    itemSelect = 'Seleccione Ubicación';
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    if(this.ticket.gap === 'punto imagen'|| this.ticket.gap ==='predio subvaluado') {
        this.selectRoute(this.ticket.cod);
        this.closeTrue = 'closed';
        this.itemSelect = '01. Ubicación';
    }else {
        this._router.navigate([`predio/${this.ticket.ubicaciones[0]}`] , {relativeTo: this._activeRoute});
        this.itemSelect =`${this.ticket.ubicaciones[0].id}. Ubicaciones`;
    }

  }

  navegateTo(item: any): void {
    this.itemSelect = `${item.id}. Ubicación`;
    this._router.navigate([`predio/${item.id}`] , {relativeTo: this._activeRoute});
    console.log(item, 'item');
  }

    selectRoute(item): void {
        switch (this.ticket.gap) {
            case 'Predio sin geo':
                this._router.navigate([`predio/${item}`] , {relativeTo: this._activeRoute});
            break;
            case 'punto imagen':
                this._router.navigate([`puntoImagen/${item}`] , {relativeTo: this._activeRoute});
            break;
            case 'predio subvaluado':
                this._router.navigate([`sub/${item}`] , {relativeTo: this._activeRoute});
            break;
        }
    }

}
