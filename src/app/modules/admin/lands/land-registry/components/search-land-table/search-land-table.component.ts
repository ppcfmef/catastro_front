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
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
  @Output() showLandMap: EventEmitter<LandRecord> = new EventEmitter();

  displayedColumns = [
    'nro', 'landCode', 'municipalLandCode', 'habilitacionName', 'steetName', 'urbanMza', 'urbanLotNumber', 'roadBlockNumber', 'site', 'municipalNumber',
    'alternateNumber', 'dptoNumber', 'indoor', 'block', 'map'
  ];
  count = 0;
  pageIndex = 0;
  pageSize = 10;

  constructor() {}

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.changePage.emit(paginator);
  }

  onshowLandMap(landRecord: LandRecord): void {
    this.showLandMap.emit(landRecord);
  }
}
