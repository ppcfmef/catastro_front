import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LandUI } from '../../interfaces/land.interface';
@Component({
  selector: 'app-list-land-maintenance-table',
  templateUrl: './list-land-maintenance-table.component.html',
  styleUrls: ['./list-land-maintenance-table.component.scss']
})
export class ListLandMaintenanceTableComponent implements OnInit {
    @Input() dataSource: LandUI[];
    @Input() length: number;
    @Input() selectedId: number;
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    displayedColumns: string[] = ['nro','cup', 'habilitacionName', 'municipalAddress', 'creationDate','typeApplication','actions'];
    landSelected = new Set<any>();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
    #typeControl = new FormControl(null, Validators.required);
    typesMaintenance =[
        {
        id:1 , text :'Reasignar ubicación',routerLink:'reassignment',
        },
        {
            id:2 , text :'Acumulación',routerLink:'accumulation',
            },
            {
                id:3 , text :'División',routerLink:'split',
                },
                {
                    id:4 , text :'Eliminar',routerLink:null,
                    },

];
    private unsubscribeAll = new Subject<any>();

  constructor( private _router: Router,) { }

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }

  landSelection(landRecord: LandUI): void{
    const idtypeApplication=landRecord.typeApplication;
    if(idtypeApplication!==4){
        const typeMaintenance=this.typesMaintenance.find(e=> e.id===idtypeApplication);
        const typeMaintenanceRouterLink= typeMaintenance.routerLink?typeMaintenance.routerLink:'';
        this._router.navigate(['/land/maintenance',typeMaintenanceRouterLink,landRecord.id]);
    }

  }

  onChangeSolicitud(i: number,row: any): void{

  }
}
