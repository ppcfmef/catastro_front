import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Actions } from 'app/shared/enums/actions.enum';
import { ApplicationUI } from '../../interfaces/application';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-application-maintenance-table',
  templateUrl: './list-application-maintenance-table.component.html',
  styleUrls: ['./list-application-maintenance-table.component.scss']
})
export class ListApplicationMaintenanceTableComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() length: number;
    @Input() ubigeo: string ;
    @Input() typeAction: string= Actions.LEER;
    @Input() dataSource: ApplicationUI[];
    @Output() dataSourceUpdateEvent: EventEmitter<ApplicationUI[]> = new EventEmitter();
    @Output() changePage: EventEmitter<any> = new EventEmitter();
    @ViewChild(MatSort) tableSort = new MatSort();
    dataTable = new MatTableDataSource<ApplicationUI>();
    displayedColumns: string[] = ['nro','ubigeo', 'c_predios','type','date', 'status'];//,'username'
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];

    //sortedData: ApplicationUI[];
    //
    sort: Sort ;
    paginator: MatPaginator;
  constructor() { }
    ngOnChanges(changes: SimpleChanges): void {
        this.dataTable.data = this.dataSource;
        //this.dataTable.sort = this.tableSort;
        //throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.dataTable.data = this.dataSource;

    /*this.dataTable.sort = this.tableSort;*/
  }



  ngAfterViewInit(): void {
    this.dataTable.data = this.dataSource;
    this.dataTable.sort = this.tableSort;
}
  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.paginator = paginator;
    this.changePage.emit( {paginator:this.paginator, sort: this.sort});


  }







  sortData(sort: Sort): void {
    this.sort = sort;
    this.changePage.emit( {paginator:this.paginator, sort: this.sort});
    /*const data =  this.dataTable.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }*/

  }
}










