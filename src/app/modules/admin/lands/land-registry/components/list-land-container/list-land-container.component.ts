import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandRegistryService } from '../../services/land-registry.service';
import { LandRegistryMapService } from '../../services/land-registry-map.service';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';


@Component({
  selector: 'app-list-land-container',
  templateUrl: './list-land-container.component.html',
  styleUrls: ['./list-land-container.component.scss']
})
export class ListLandContainerComponent implements OnInit, OnDestroy {

  landRecords: LandRegistryMap[];
  tableLength: number;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private landOwnerId!: number;
  private defaultTableLimit = 5;

  constructor(
    private landRegistryService: LandRegistryService,
    private landRegistryMapService: LandRegistryMapService,
  ) { }

  ngOnInit(): void {
    this.landRegistryService.getLandOwner()
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (ownerResult) => {
        this.landOwnerId = ownerResult?.id;
        if (this.landOwnerId) {
          this.landRegistryService
          .getLandList({ limit: this.defaultTableLimit, owner: this.landOwnerId })
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

  seledRecord(landRecord: LandRegistryMap): void {
    this.landRegistryMapService.landIn = landRecord;
  }
  onChangePage(paginator: MatPaginator): void {
    const ownerFilter = { owner: this.landOwnerId };
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, ownerFilter };

    this.landRegistryService.getLandList(queryParams)
    .toPromise()
    .then(result => this.landRecords = result.results);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
