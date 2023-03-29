import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';


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
  ubigeo: string;
  unsubscribeAll: Subject<any> = new Subject<any>();
  idView = 'gprpregist';
  hideSelectUbigeo = true;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private _landOwnerService: LandOwnerService,
    private landRecordService: LandRecordService,
    private exportReportService: ExportReportService,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
    this.navigationAuthorizationService.userScopePermission(this.idView)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((data: any) => {
      if(!data?.limitScope){
        this.ubigeo = null;
        this.hideSelectUbigeo = false;
      }
      else {
        this.hideSelectUbigeo = true;
        this.ubigeo = data?.ubigeo;
      }

      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    });
  }

  ngAfterViewInit(): void {
    const queryParams = this.makeQueryParams();
    this.getLandRecords({limit: 10, ...queryParams});
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onChangePage(data: {paginator: any; sort: Sort}): void {
    const filterQueryParams = this.makeQueryParams();
    const limit = data?.paginator.pageSize;
    const offset = limit * data?.paginator.pageIndex;
    const ordering = this.orderingFormater(data.sort);
    const queryParams = { limit, offset, ordering, ...filterQueryParams };
    this.getLandRecords(queryParams);
  }

  onShowLandsMap(landRecord: LandRecord): void {
    this._landOwnerService.getDetail(landRecord.owner)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
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
    const queryParams = this.makeQueryParams();
    this.getLandRecords(queryParams);
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

  onSelectUbigeo(ubigeo: string): void {
    this.ubigeo = ubigeo;
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    const queryParams = this.makeQueryParams();
    this.getLandRecords(queryParams);
  }

  private makeQueryParams(): {[key: string]: string | number} {
    const rawValue = this.formFilters.getRawValue();
    const queryParams = {};
    const search = rawValue?.search || null;
    const status = rawValue?.status;
    const ubigeo = this.ubigeo;
    if (search !== null) {
      queryParams['search'] = search;
    }

    if (status !== null && status !== undefined) {
      queryParams['status'] = status;
    }

    if (ubigeo !== null && ubigeo !== undefined) {
      queryParams['ubigeo'] = ubigeo;
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
    this.getLandRecords({limit: 10});
  }

  private getLandRecords(queryParams): void {
    this.ownerLandSubscription = this.landRecordService.getList(queryParams)
    .subscribe(
      (response: IPagination<LandRecord>) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
        this.cdRef.detectChanges();
    });
  }

  private orderingFormater(sort: Sort): string {
    const orderingActive = sort?.active;
    return (sort?.direction === 'desc') ? '-'+orderingActive : orderingActive;
  }
}
