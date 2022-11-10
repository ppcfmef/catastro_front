import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { ExportReportService } from 'app/shared/services/export-report.service';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandRecord } from '../../interfaces/land-record.interface';
import { LandOwnerService } from '../../services/land-owner.service';
import { LandRecordService } from '../../services/land-record.service';

@Component({
  selector: 'app-search-land-container',
  templateUrl: './search-land-container.component.html',
  styleUrls: ['./search-land-container.component.scss']
})
export class SearchLandContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ownerLandSubscription: Subscription;

  formFilters: FormGroup;

  showOwnerTable = false;

  showLandsMap = false;

  dataSource: LandOwner[] = [];
  dataSourceLands: LandRecord[] = [];
  lengthOwner: number = 0;
  lengthLandsOwner: number = 0;
  landOwner: LandOwner;
  landRecord: LandRecord;

  constructor(
    private router: Router,
    private _landOwnerService: LandOwnerService,
    private landRecordService: LandRecordService,
    private exportReportService: ExportReportService,

  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ownerLandSubscription = this.landRecordService.getList({limit: 10})
    .subscribe(
      (response: IPagination<LandRecord>) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
    });
  }

  ngOnDestroy(): void {
    this.ownerLandSubscription.unsubscribe();
  }

  onChangePage(data: {paginator: any; sort: Sort}): void {
    // ToDo: cambiar a makeQueryParam
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || '';
    const limit = data?.paginator.pageSize;
    const offset = limit * data?.paginator.pageIndex;
    const ordering = this.orderingFormater(data.sort);
    const queryParams = { limit, offset, search, ordering };

    this.landRecordService.getList(queryParams).subscribe(
      (response) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
      }
    );
  }

  onShowLandsMap(landRecord: LandRecord): void {
    this._landOwnerService.getDetail(landRecord.owner).subscribe(
      (response) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
        this.landOwner = response.results[0];
        this.landRecord = landRecord;
        this.showOwnerTable = true;
        this.showLandsMap = true;
      }
    );
  }

  onDowloandCroquis(): void{
    this.landRecordService.setLandRecordDownloadCroquis(true);
  }

  onClickSearch(): void {
    // ToDo: cambiar a makeQueryParam
    const rawValue = this.formFilters.getRawValue();
    const queryParams = {};
    const search = rawValue?.search || null;
    const status = rawValue?.status;
    if (search !== null) {
      queryParams['search'] = search;
    }

    if (status !== null && status !== undefined) {
      queryParams['status'] = status;
    }
    this.landRecordService.getList(queryParams)
    .subscribe((response: IPagination<LandRecord>) => {
      this.dataSourceLands = response.results;
      this.lengthLandsOwner = response.count;
    });
  }

  onCleanSearch(): void {
    this.formFilters.get('search').setValue(null);
    this.getDefaultData();
  }

  onChangeView(): void {
    const tabView = this.formFilters.get('view').value;
    if (tabView === 'predio') {
      this.router.navigate(['/land/registry/search/search-land']);
    }
    else if (tabView === 'Contribuyente') {
      this.router.navigate(['/land/registry/search/search-owner']);
    }
  }

  onFilterStatus(): void {
    const status = this.formFilters.get('status').value;
    if (status !== undefined) {
      this.onClickSearch(); // Todo: se debe unificar en un solo metodo
    }else {
      this.getDefaultData();
    }
  }

  onDownloadReport(): void {
    const queryParams = this.makeQueryParams();
    const exportUrl = this.exportReportService.getUrlExportReport('/land/records/', queryParams);
    window.open(exportUrl, '_blank');
  }

  private makeQueryParams(): {[key: string]: string | number} {
    const rawValue = this.formFilters.getRawValue();
    const queryParams = {};
    const search = rawValue?.search || null;
    const status = rawValue?.status;
    if (search !== null) {
      queryParams['search'] = search;
    }

    if (status !== null && status !== undefined ) {
      queryParams['status'] = status;
    }
    return queryParams;
  }

  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
      view: new FormControl('predio'),
      status: new FormControl(),
    });
  }

  private getDefaultData(): void {
    this.ownerLandSubscription = this.landRecordService.getList({limit: 10})
    .subscribe(
      (response: IPagination<LandRecord>) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
    });
  }

  private orderingFormater(sort: Sort): string {
    const orderingActive = sort?.active;
    return (sort?.direction === 'desc') ? '-'+orderingActive : orderingActive;
  }
}
