import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Actions } from 'app/shared/enums/actions.enum';
import { ApplicationUI } from '../../interfaces/application';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';

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
    @ViewChild(MatPaginator) tablePaginator: MatPaginator;
    @ViewChild(MatSort) tableSort = new MatSort();
    dataTable = new MatTableDataSource<ApplicationUI>();
    displayedColumns: string[] = ['nro','ubigeo', 'c_predios','type','date', 'status'];//,'username'
    pageIndex = 0;
    pageSize = 25;
    pageSizeOptions = [1, 10, 25, 50, 100, 250, 500];
    tableFilters: {paginator: any; sort: Sort};
    defaultPaginator;
    selectedRowIndex: number | null = null;
    //sortedData: ApplicationUI[];
    //
    sort: Sort ;
    paginator: MatPaginator;

    //inject service
    #router = inject(Router);
    #activatedRoute= inject(ActivatedRoute);

    constructor() {
        this.defaultPaginator = {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0};
        this.tableFilters = {
        paginator: {previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: 0},
        sort: {active: 'date', direction: 'desc'}
        };
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.dataSource?.currentValue) {
            this.dataTable.data = changes?.dataSource?.currentValue;
        };

        if (changes?.length?.currentValue) {
            this.tableFilters.paginator = this.defaultPaginator;
            this.tableFilters.paginator.length = changes?.length?.currentValue;
            this.pageIndex =0;
            this.pageSize = 25;
            this.length = changes?.length?.currentValue;
        };
    };

    ngOnInit(): void {
        // this.dataTable.data = this.dataSource;

        /*this.dataTable.sort = this.tableSort;*/
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
        this.changePage.emit(this.tableFilters);
        });
    };
    onPage(paginator: MatPaginator): void {
        this.pageIndex = paginator.pageIndex;
        this.pageSize = paginator.pageSize;
    };

    detailObserved(element): void {
        this.#router.navigate([`./${element.id}`], {relativeTo: this.#activatedRoute});
        this.selectedRowIndex = element.id;
    };

    sortData(sort: Sort): void {
        this.sort = sort;
        this.changePage.emit( {paginator:this.paginator, sort: this.sort});
    };
};










