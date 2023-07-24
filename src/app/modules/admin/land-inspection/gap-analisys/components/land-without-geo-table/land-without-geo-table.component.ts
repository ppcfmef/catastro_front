import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LandUI } from 'app/modules/admin/lands/maintenance/interfaces/land.interface';

@Component({
  selector: 'app-land-without-geo-table',
  templateUrl: './land-without-geo-table.component.html',
  styleUrls: ['./land-without-geo-table.component.scss']
})
export class LandWithoutGeoTableComponent implements OnInit {
    @Input() dataSource: LandUI[];
    @Input() length: number;
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['nro','cup', 'habilitacionName', 'direccion', 'creationDate','typeApplication','actions'];
    landSelected = new Set<any>();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
  constructor() { }

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }
  onRefreshPage(): void {
    this.refreshPage.emit();
  }
}
