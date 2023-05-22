import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { ApplicationUI } from '../../interfaces/application';
import { ApplicationMaintenanceService } from '../../services/application-maintenance.service';

@Component({
  selector: 'app-list-application-maintenance-container',
  templateUrl: './list-application-maintenance-container.component.html',
  styleUrls: ['./list-application-maintenance-container.component.scss']
})
export class ListApplicationMaintenanceContainerComponent implements OnInit {
    applicationRecords: ApplicationUI[];
    tableLength: number;
    search={};
    private defaultTableLimit = 5;
  constructor(
    private _applicationMaintenanceService: ApplicationMaintenanceService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.getInitList();
  }
  onChangePage(paginator: MatPaginator | {pageSize: number; pageIndex: number}): void {
    //const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const filterRawValue = { limit, offset, ...this.search };
    const queryParams=CommonUtils.deleteKeysNullInObject(filterRawValue);
    this._applicationMaintenanceService.getList(queryParams).toPromise().then((result)=> {
        this.applicationRecords=result.results;
        this.applicationRecords.map((a)=> {
            //console.log(a.lands.map(l=>l.cpm).join(','));
            a.landsFlat= a.lands.map(l=>l.cpm).join(',');
        });
    }



        );

  }

  getInitList(): void {

    const queryParams = { limit: this.defaultTableLimit };

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

  onDownload(): void {

  }
}
