import { merge, Subject, takeUntil } from 'rxjs';
import { Component, OnInit,Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LandOwner } from '../../interfaces/land-owner.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-owner-table',
  templateUrl: './search-owner-table.component.html',
  styleUrls: ['./search-owner-table.component.scss']
})
export class SearchOwnerTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() dataSource: LandOwner[];
  @Input() length: number = 0;
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() showLandsTable: EventEmitter<LandOwner> = new EventEmitter();
  @Output() showLandOwner: EventEmitter<LandOwner> = new EventEmitter();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;
  dataTable = new MatTableDataSource<LandOwner>();

  displayedColumns = ['nro','ubigeo', 'documentType', 'dni','code', 'name', 'descriptionOwner', 'creationDate', 'lands'];
  pageIndex = 0;
  pageSize = 10;
  tableFilters: {paginator: any; sort: Sort};
  defaultPaginator;
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(private cdRef: ChangeDetectorRef) {
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
    this.tableFilters = {
      paginator: this.defaultPaginator,
      sort: {active: 'creationDate', direction: 'asc'}
    };
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
      if (changes?.dataSource?.currentValue) {
        this.dataTable.data = changes?.dataSource?.currentValue;
        this.dataTable.data.map(d=> d.numberLands = d.lands.length );
      }

      if (changes?.length?.currentValue) {
        this.tableFilters.paginator.length = changes?.length?.currentValue;
        this.pageIndex = 0;
        this.pageSize = 10;
      }
  }

  ngAfterViewInit(): void {
    this.dataTable.sort = this.tableSort;

    merge(this.tableSort?.sortChange, this.tablePaginator?.page)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res: any) => {
      if(res?.direction) {
        this.tableFilters.sort = res;
        this.tableFilters.paginator = this.defaultPaginator;
      }
      if (res?.pageSize) {
        this.tableFilters.paginator = res;
      }
      this.pageIndex = this.tableFilters.paginator?.pageIndex;
      this.changePage.emit(this.tableFilters);
    });
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.pageSize = paginator.pageSize;
  }

  onShowLandsTable(landOwner: LandOwner): void {
    this.showLandsTable.emit(landOwner);
    this.showLandOwner.emit(landOwner);
  }


ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
