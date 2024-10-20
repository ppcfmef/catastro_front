import { merge } from 'rxjs';
import { Component, OnInit,Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LandRecord } from '../../interfaces/land-record.interface';

@Component({
  selector: 'app-search-land-table',
  templateUrl: './search-land-table.component.html',
  styleUrls: ['./search-land-table.component.scss']
})
export class SearchLandTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() dataSource: LandRecord[];
  @Input() length: number = 0;
  @Input() reset: boolean;

  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() showLandMap: EventEmitter<LandRecord> = new EventEmitter();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  @ViewChild(MatSort) tableSort = new MatSort();
  dataTable = new MatTableDataSource<LandRecord>();

  displayedColumns = [
    'nro', 'ubigeo', 'landCode', 'habilitacionName', 'streetName', 'urbanMza', 'urbanLotNumber', 'roadBlockNumber',
    'municipalNumber', 'creationDate', 'map'
  ];
  pageIndex = 0;
  pageSize = 10;
  tableFilters: {paginator: any; sort: Sort};
  defaultPaginator;

  constructor() {
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
    this.tableFilters = {
      paginator: {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0},
      sort: {active: 'creationDate', direction: 'desc'}
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes?.dataSource?.currentValue) {
        this.dataTable.data = changes?.dataSource?.currentValue;
      }

      if (changes?.length?.currentValue) {
        this.tableFilters.paginator.length = changes?.length?.currentValue;
        this.pageIndex = 0;
        this.pageSize = 10;
      }

      if (changes.reset && changes.reset.currentValue === true) {
        this.pageIndex = 0;
        this.pageSize = 10;
        this.tableFilters.paginator.pageIndex =0;
        this.tableFilters.paginator.pageSize =10;
      }
  }

  ngAfterViewInit(): void {
    this.dataTable.sort = this.tableSort;

    merge(this.tableSort?.sortChange, this.tablePaginator?.page)
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

  onshowLandMap(landRecord: LandRecord): void {
    this.showLandMap.emit(landRecord);
  }
}
