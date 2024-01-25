import { merge } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IncomesDataService } from '../../services/incomes-data.service';
import { startWith, switchMap } from 'rxjs/operators';
import { IPagination } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-rtarancel-container',
  templateUrl: './rtarancel-container.component.html',
  styleUrls: ['./rtarancel-container.component.scss']
})
export class RTArancelContainerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['nro', 'ubigeo', 'anoEjec', 'sectorCatastral', 'arancel', 'anoXProcesar', 'arancelActual', 'idArancel'];
  dataSource = [];
  count = 0;
  pageIndex = 0;
  pageSize = 5;

  constructor(
    private incomesDataService: IncomesDataService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    merge(this.paginator?.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        const limit = this.paginator.pageSize;
        const offset = limit * this.paginator.pageIndex;
        const queryParams = { limit, offset };
        return this.incomesDataService.getRTArancel(queryParams);
      })
    ).subscribe((response: IPagination<any>) => {
        this.initialPaginator(response);
    });
  }

  private initialPaginator(pagination: IPagination<any>): void {
    this.count = pagination.count;
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.dataSource = pagination.results;
  }
}
