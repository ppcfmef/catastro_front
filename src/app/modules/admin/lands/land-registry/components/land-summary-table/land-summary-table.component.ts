import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LandRecord } from '../../interfaces/land-record.interface';

@Component({
  selector: 'app-land-summary-table',
  templateUrl: './land-summary-table.component.html',
  styleUrls: ['./land-summary-table.component.scss']
})
export class LandSummaryTableComponent implements OnInit {

  @Input() dataSource: LandRecord[];
  @Input() length: number;
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();

  displayedColumns: string[] = ['nro', 'cup', 'cpm', 'steetName'];
  predioSelected = new Set<any>();
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];

  constructor() { }

  ngOnInit(): void {
  }

  predioSelection(row): void{
    this.predioSelected.clear();
    this.predioSelected.add(row);
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }

}
