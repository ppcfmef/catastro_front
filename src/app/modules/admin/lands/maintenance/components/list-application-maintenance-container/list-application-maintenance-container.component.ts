import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { ApplicationUI } from '../../interfaces/application';
import { ApplicationMaintenanceService } from '../../services/application-maintenance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-list-application-maintenance-container',
  templateUrl: './list-application-maintenance-container.component.html',
  styleUrls: ['./list-application-maintenance-container.component.scss']
})
export class ListApplicationMaintenanceContainerComponent implements OnInit {
    applicationRecords: ApplicationUI[];
    tableLength: number;
    search={};
    filters={};
    formFilters: FormGroup;
    typesMaintenance =[
        {
        id:1 , text :'Reasignar ubicación'
        },
        {
            id:2 , text :'Acumulación'
            },
            {
                id:3 , text :'División'
                },
                {
                    id:4 , text :'Inactivar'
                    },

    ];

    status =[
        {
        id:1 , text :'Por atender',
        },
        {
            id:2 , text :'Atendido',
            },
            {
                id:3 , text :'Observado',
                },


    ];
     defaultTableLimit = 5;
     offset=null;
     limit =this.defaultTableLimit;
     ordering='';
  constructor(
    private _applicationMaintenanceService: ApplicationMaintenanceService,
    private _router: Router,
    private fb: FormBuilder,
    ) {

        this.createFormFilters();
    }

  ngOnInit(): void {
    this.getInitList();
  }

   createFormFilters(): void {

    this.formFilters =  new FormGroup({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        id_status:new FormControl(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        id_type:new FormControl(),
    });

  }

  //onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    onChangePage(data: {paginator: MatPaginator | {pageSize: number; pageIndex: number}; sort: Sort}): void {
    //const ownerFilter = { owner: this.landOwnerId };

    if(data.paginator){
        this.limit = data.paginator.pageSize;
        this.offset = this.limit * data.paginator.pageIndex;
    }

    this.ordering = this.orderingFormater(data.sort);
    this.getList();

  }

  getInitList(): void {
    this.limit = this.defaultTableLimit;
    this.offset = null;
    this.filters = {};
    this.search = {};
    this.ordering='-date';
    this.getList();
  }

  getList(): void {

    const limit = this.limit;
    const offset = this.offset;
    const filters = this.formFilters.getRawValue();
    const ordering=this.ordering;
    const search = this.search;

    const filterRawValue = { limit, offset, ordering,...filters,...search };
    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);

    this._applicationMaintenanceService.getList(queryParams)
        .toPromise()
        .then(
        (landResult) => {

            this.applicationRecords = landResult.results;
            this.applicationRecords.map((a)=> {
                //console.log(a.lands.map(l=>l.cpm).join(','));
                a.landsFlat= a.lands.map(l=>l.cpm).join(',');
            });
            this.tableLength =landResult.count;
        }
        );
  }

  onAddApplication(): void{
    this._router.navigate(['/land/maintenance/list']);
  }

  onFilter(event: any): void{
    const rawValue = this.formFilters.getRawValue();
    console.log('rawValue>>',rawValue);
    this.getList();
  }
  onDownload(): void {

  }


  private orderingFormater(sort: Sort): string {
    const orderingActive = sort?.active;
    return (sort?.direction === 'desc') ? '-'+orderingActive : orderingActive;
  }
}
