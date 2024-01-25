import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LandUI } from '../../interfaces/land.interface';
import { MatPaginator } from '@angular/material/paginator';
import { LandMaintenanceService } from '../../services/land-maintenance.service';
import { LandModel } from '../../models/land.model';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { MatDialog } from '@angular/material/dialog';
import { LandMaintenanceFormComponent } from '../land-maintenance-form/land-maintenance-form.component';
import { Actions } from 'app/shared/enums/actions.enum';
@Component({
  selector: 'app-list-land-maintenance-container',
  templateUrl: './list-land-maintenance-container.component.html',
  styleUrls: ['./list-land-maintenance-container.component.scss']
})
export class ListLandMaintenanceContainerComponent implements OnInit {
    landRecords: LandUI[];
    tableLength: number;
    search: any;
    ubigeo: string =null;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    private defaultTableLimit = 5;
  constructor(  private landMaintenanceService: LandMaintenanceService,

    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.ubigeo=localStorage.getItem('ubigeo')?localStorage.getItem('ubigeo'):null;
    this.getInitList();
}



  onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    //const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const filterRawValue = { limit, offset, search: this.search,ubigeo:this.ubigeo };
    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
    this.landMaintenanceService.getHasNotApplicationsList(queryParams)
    .toPromise()
    .then(result => this.landRecords = result.results);
  }

  onSearch( search: any ): void{
    this.search = search;
    const ubigeo = this.ubigeo;
    const filterRawValue = { search,ubigeo:this.ubigeo };
    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
    console.log('queryParams>>',queryParams);
    this.landMaintenanceService.getHasNotApplicationsList(queryParams)
    .toPromise()
    .then((result) => {
        this.landRecords = result.results;
        this.tableLength =result.count;
    });
  }

  onClearSearch(): void{
    this.search = null;
    this.getInitList();
  }
  getInitList(): void {
   
    const filterRawValue = { limit: this.defaultTableLimit, ubigeo:this.ubigeo};

    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
    console.log('queryParams>>',queryParams);
    this.landMaintenanceService.getHasNotApplicationsList(queryParams)
        .toPromise()
        .then(
        (landResult) => {

            this.landRecords = landResult.results;
            this.tableLength =landResult.count;
        }
        );
  }

  generateAccumulation(): void {

    const dialogRef = this.dialog.open(LandMaintenanceFormComponent, {
        data: {action:Actions.CREAR},
        width: '600px',
        height:'100%'
      });
      dialogRef.afterClosed().subscribe((result) => {

        //console.log('The dialog was closed');

      });
  }
  onRefreshPage(event: any): void{
    this.getInitList();
  }
}

