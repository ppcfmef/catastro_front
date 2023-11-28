import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';

import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandRecord } from '../../interfaces/land-record.interface';
import { LandOwnerService } from '../../services/land-owner.service';
import { LandRecordService } from '../../services/land-record.service';
import { NavigationAuthorizationService } from 'app/shared/services/navigation-authorization.service';
import { takeUntil } from 'rxjs/operators';
import { CommonUtils } from 'app/core/common/utils/common.utils';
import { LandRegistryService } from '../../services/land-registry.service';


@Component({
  selector: 'app-search-owner-container',
  templateUrl: './search-owner-container.component.html',
  styleUrls: ['./search-owner-container.component.scss']
})
export class SearchOwnerContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  changesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  ownerLandSubscription: Subscription;

  formFilters: FormGroup;

  showLandsTable = false;

  showLandsMap = false;

  dataSource: LandOwner[] = [];
  dataSourceLands: any[] = [];
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
    private landRegistryService: LandRegistryService,
    private navigationAuthorizationService: NavigationAuthorizationService,
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

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

      this.cdRef.detectChanges();
      this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;

      const queryParams = this.makeQueryParams();
      this.getLandOwnerRecords({limit: 10, ...queryParams});
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onSelectUbigeo(ubigeo: string): void {
    this.ubigeo = ubigeo;
    this.navigationAuthorizationService.ubigeoNavigation = this.ubigeo;
    const queryParams = this.makeQueryParams();
    this.getLandOwnerRecords(queryParams);
  }

  getLandOwnerRecords(queryParams): void {
    this._landOwnerService.getList(queryParams)
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
        this.cdRef.detectChanges();
    });
  }

  makeQueryParams(): {[key: string]: string | number} {
    const rawValue = this.formFilters.getRawValue();
    const queryParams = {};
    const search = rawValue?.search || null;
    const ubigeo = this.ubigeo;
    queryParams['search'] = search;
    queryParams['ubigeo'] = ubigeo;
    /*if (search !== null) {
      queryParams['search'] = search;
    }

    if (ubigeo !== null && ubigeo !== undefined) {
      queryParams['ubigeo'] = ubigeo;
    }*/
    return CommonUtils.deleteKeysNullInObject( queryParams);
  }

  onClickSearch(): void {
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || '';
    const filterQueryParams = this.makeQueryParams();
    const queryParams = { search , ...filterQueryParams  };

    this._landOwnerService.getList(queryParams)
    .subscribe((response: IPagination<LandOwner>) => {
      this.dataSource = response.results;
      this.lengthOwner = response.count;
    });
  }

  onChangePage(data: {paginator: any; sort: Sort}): void {
    const filterQueryParams = this.makeQueryParams();
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || '';
    const limit = data.paginator.pageSize;
    const offset = limit * data.paginator.pageIndex;
    const ordering = this.orderingFormater(data.sort);
    const queryParams = { limit, offset, search, ordering ,... filterQueryParams };

    this._landOwnerService.getList(queryParams).toPromise().then(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
    });
  }

  onShowLandsTable(landOwner: LandOwner): void {
    const filterQueryParams = this.makeQueryParams();
    console.log('onShowLandsTable landOwner>>',landOwner);
    this.showLandsTable = true;
    this.showLandsMap = false;
    this.landOwner = landOwner;
    const queryParams = { limit: 10 ,...filterQueryParams };
    this.landRegistryService
    .getLandbyOwner(this.landOwner.id, queryParams)
    .toPromise()
    .then(
      (landResult) => {

        this.dataSourceLands = landResult.results;
        this.lengthLandsOwner = landResult.count;
        this.landRecord =this.dataSourceLands[0];
        this.showLandsMap= true;
        /*this.landRecords = landResult.results;
        this.tableLength = landResult.count;
        if (this.landId && this.tableLength > 0) {
          setTimeout(() => { // ToDo: Coordinar con frank porque demora tanto su mapa
            this.seledRecord(this.landRecords[0]);
          }, 6000);
        }*/
      }
    );
    /*this.landRecordService.getList(queryParams).subscribe(
      (response) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
      }
    );*/
  }

  onChangePageLand(data: {paginator: any; sort: Sort}): void {
    //const filterQueryParams = this.makeQueryParams();
    const owner = this.landOwner.id;
    const limit = data?.paginator.pageSize;
    const offset = limit * data?.paginator.pageIndex;
    const ordering = this.orderingFormater(data.sort);
    const queryParams = { limit, offset, owner, ordering,  };

    this.landRecordService.getList(queryParams).subscribe(
      (response) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
      }
    );
  }

  onShowLandsMap(landRecord: LandRecord): void {
    this.showLandsMap = false;
    this.landRecord = landRecord;
    setTimeout(()=> { this.showLandsMap = true; }, 1000);
  }

  onDowloandCroquis(): void{
    this.landRecordService.setLandRecordDownloadCroquis(true);
  }

  onCleanSearch(): void {

    this.formFilters.get('search').setValue(null);
    const filterQueryParams = this.makeQueryParams();
    this.showLandsTable = false;
    this.showLandsMap = false;
    this._landOwnerService.getList({ limit: 10 ,... filterQueryParams})
    .subscribe((response: IPagination<LandOwner>) => {
      this.dataSource = response.results;
      this.lengthOwner = response.count;
    });
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

  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
      view: new FormControl('Contribuyente')
    });
  }

  private orderingFormater(sort: Sort): string {
    const orderingActive = sort?.active;
    return (sort?.direction === 'desc') ? '-'+orderingActive : orderingActive;
  }
}
