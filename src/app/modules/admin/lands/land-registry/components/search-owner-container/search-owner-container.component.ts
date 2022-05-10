import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import {FormControl, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';

import { IPagination } from 'app/core/common/interfaces/common.interface';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { LandOwnerService } from '../../services/land-owner.service';


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

  dataSource: LandOwner[] = [];

  constructor(
    private _landOwnerService: LandOwnerService,
  ) {
    this.createFormFilters();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.ownerLandSubscription = this._landOwnerService.getList({})
    .subscribe(
      (response: IPagination<LandOwner>) => {
        this.dataSource = response.results;
    });

    this.formFilters.valueChanges.pipe(
      switchMap(() => {
        const rawValue = this.formFilters.getRawValue();
        const search = rawValue?.search || null;
        const queryParams = { search };
        return this._landOwnerService.getList(queryParams);
      })
    ).subscribe((response: IPagination<LandOwner>) => {
      this.dataSource = response.results;
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

  onShowLandsTable(landOwnerId: number): void {
    this.showLandsTable = true;
  }

  private createFormFilters(): void {
    this.formFilters = new FormGroup({
      search: new FormControl(),
    });
  }

}
