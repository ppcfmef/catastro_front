import { merge } from 'rxjs';
import { Component, OnInit,Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class SearchOwnerTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() dataSource: LandOwner[];
  @Input() length: number = 0;
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  @Output() showLandsTable: EventEmitter<LandOwner> = new EventEmitter();
  @Output() showLandOwner: EventEmitter<LandOwner> = new EventEmitter();
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  @ViewChild(MatSort) tableSort = new MatSort();
  dataTable = new MatTableDataSource<LandOwner>();

  displayedColumns = ['nro','ubigeo', 'documentType', 'dni','code', 'name', 'descriptionOwner', 'creationDate', 'lands'];
  pageIndex = 0;
  pageSize = 10;
  tableFilters: {paginator: any; sort: Sort};
  defaultPaginator;

  constructor(private cdRef: ChangeDetectorRef) {
    this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
    this.tableFilters = {
      paginator: this.defaultPaginator,
      sort: {active: 'creationDate', direction: 'desc'}
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes?.dataSource?.currentValue) {
        this.dataTable.data = changes?.dataSource?.currentValue;
      }

      if (changes?.length?.currentValue) {
        console.log(changes?.length?.currentValue, 'here'); 
        console.log(this.tableFilters, 'this.tableFilters.paginator');
        this.tableFilters.paginator.length = changes?.length?.currentValue;
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
    this.changePage.emit(paginator);
  }

  onShowLandsTable(landOwner: LandOwner): void {
    this.showLandsTable.emit(landOwner);
    this.showLandOwner.emit(landOwner);
  }

}
