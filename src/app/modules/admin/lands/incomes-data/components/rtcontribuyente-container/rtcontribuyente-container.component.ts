import { merge } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IncomesDataService } from '../../services/incomes-data.service';
import { startWith, switchMap } from 'rxjs/operators';
import { IPagination } from 'app/core/common/interfaces/common.interface';

@Component({
  selector: 'app-rtcontribuyente-container',
  templateUrl: './rtcontribuyente-container.component.html',
  styleUrls: ['./rtcontribuyente-container.component.scss']
})
export class RTContribuyenteContainerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['nro', 'ubigeo', 'documentoDesc', 'numDoc', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'estado'];
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
        return this.incomesDataService.getRTContribuyente(queryParams);
      })
    ).subscribe((response: IPagination<any>) => {
        this.count = response.count;
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.dataSource = response.results;
    });
  }
}
