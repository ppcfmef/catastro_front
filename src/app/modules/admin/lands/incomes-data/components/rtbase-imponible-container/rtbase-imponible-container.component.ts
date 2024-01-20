import { merge } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { IncomesDataService } from '../../services/incomes-data.service';
import { startWith, switchMap } from 'rxjs/operators';
import { IPagination } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-rtbase-imponible-container',
  templateUrl: './rtbase-imponible-container.component.html',
  styleUrls: ['./rtbase-imponible-container.component.scss']
})
export class RTBaseImponibleContainerComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['nro', 'ubigeo', 'codContr', 'baseImponibleT', 'baseImponibleT1', 'fechaData'];
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
        return this.incomesDataService.getRTBaseImponible(queryParams);
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
