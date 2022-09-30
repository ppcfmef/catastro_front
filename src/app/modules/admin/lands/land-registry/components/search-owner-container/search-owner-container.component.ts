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
  dataSourceLands: LandRecord[] = [];
  lengthOwner: number = 0;
  lengthLandsOwner: number = 0;
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
    this.ownerLandSubscription = this._landOwnerService.getList({limit: 10})
    .subscribe(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
    });

    this.formFilters.valueChanges.pipe(
      switchMap(() => {
        const rawValue = this.formFilters.getRawValue();
        const search = rawValue?.search || '';
        const queryParams = { search };
        return this._landOwnerService.getList(queryParams);
      })
    ).subscribe((response: IPagination<LandOwner>) => {
      this.dataSource = response.results;
      this.lengthOwner = response.count;
    });
  }

  ngOnDestroy(): void {
    this.ownerLandSubscription.unsubscribe();
  }

  onChangePage(paginator: MatPaginator): void {
    const rawValue = this.formFilters.getRawValue();
    const search = rawValue?.search || '';
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, search };

    this._landOwnerService.getList(queryParams).toPromise().then(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
        this.lengthOwner = response.count;
    });
  }

  onShowLandsTable(landOwner: LandOwner): void {
    this.showLandsTable = true;
    this.showLandsMap = false;
    this.landOwner = landOwner;
    const queryParams = { limit: 10, owner: this.landOwner.id };
    this.landRecordService.getList(queryParams).subscribe(
      (response) => {
        this.dataSourceLands = response.results;
        this.lengthLandsOwner = response.count;
      }
    );
  }

  onChangePageLand(paginator: MatPaginator): void {
    const owner = this.landOwner.id;
    const limit = paginator.pageSize;
    const offset = limit * paginator.pageIndex;
    const queryParams = { limit, offset, owner };

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

  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
    });
  }
}
