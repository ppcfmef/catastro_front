import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { LandRecord } from '../../interfaces/land-record.interface';

@Component({
  selector: 'app-search-land-table',
  templateUrl: './search-land-table.component.html',
  styleUrls: ['./search-land-table.component.scss']
})
export class SearchLandTableComponent implements OnInit {

  @Input() dataSource: LandRecord[];
  @Input() length: number = 0;
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
  @Output() showLandMap: EventEmitter<LandRecord> = new EventEmitter();

  displayedColumns = [
    'nro', 'ubigeo', 'landCode', 'municipalLandCode', 'habilitacionName', 'steetName', 'urbanMza', 'urbanLotNumber', 'roadBlockNumber', 'municipalNumber',
    'creationDate', 'map'
  ];
  pageIndex = 0;
  pageSize = 10;

  constructor() {}

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }

  onshowLandMap(landRecord: LandRecord): void {
    this.showLandMap.emit(landRecord);
  }
}
