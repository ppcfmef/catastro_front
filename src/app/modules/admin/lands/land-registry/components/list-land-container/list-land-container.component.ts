import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandRecordService } from '../../services/land-record.service';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRecord } from '../../interfaces/land-record.interface';


@Component({
  selector: 'app-list-land-container',
  templateUrl: './list-land-container.component.html',
  styleUrls: ['./list-land-container.component.scss']
})
export class ListLandContainerComponent implements OnInit, OnDestroy {

  landRecords: LandRecord[];
  tableLength: number;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private landOwnerId!: number;
  private defaultTableLimit = 5;

  constructor(
    private landRecordService: LandRecordService,
    private landRegistryService: LandRegistryService
  ) { }

  ngOnInit(): void {
    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (ownerResult) => {
        this.landOwnerId = ownerResult?.id;
        if (this.landOwnerId) {
          this.landRecordService
          .getList({ limit: this.defaultTableLimit, owner: this.landOwnerId })
          .subscribe(
            (landResult) => {
              this.landRecords = landResult.results;
              this.tableLength = landResult.count;
            }
          );
        }
      }
    );
  }

  onChangePage(paginator: MatPaginator): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, ownerFilter };

    this.landRecordService.getList(queryParams)
    .toPromise()
    .then(result => this.landRecords = result.results);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
