import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import {FormControl, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';

import { IPagination } from 'app/core/common/interfaces/common.interface';
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

  landOwner: LandOwner;
  landRecord: LandRecord;

  constructor(
    private _landOwnerService: LandOwnerService,
    private landRecordService: LandRecordService,
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ownerLandSubscription = this.landRecordService.getList({})
    .subscribe(
      (response: IPagination<LandRecord>) => {
        this.dataSourceLands = response.results;
    });

    this.formFilters.valueChanges.pipe(
      switchMap(() => {
        const rawValue = this.formFilters.getRawValue();
        const search = rawValue?.search || null;
        const queryParams = { search };
        return this.landRecordService.getList(queryParams);
      })
    ).subscribe((response: IPagination<LandRecord>) => {
      this.dataSourceLands = response.results;
    });
  }

  ngOnDestroy(): void {
    this.ownerLandSubscription.unsubscribe();
  }

  onChangePage(paginator: MatPaginator): void {
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || null;
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, search };

    this._landOwnerService.getList(queryParams).toPromise().then(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
    });
  }

  onShowLandsMap(landRecord: LandRecord): void {
    this._landOwnerService.getDetail(landRecord.ownerId).subscribe(
      (response) => {
        this.dataSource = response.results;
        this.landOwner = response.results[0];
        this.landRecord = landRecord;
        this.showOwnerTable = true;
        this.showLandsMap = true;
      }
    );
  }

  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
    });
  }

}
