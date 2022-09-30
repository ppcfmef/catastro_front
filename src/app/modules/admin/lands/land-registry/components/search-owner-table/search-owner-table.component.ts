import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { LandOwner } from '../../interfaces/land-owner.interface';

@Component({
  selector: 'app-search-owner-table',
  templateUrl: './search-owner-table.component.html',
  styleUrls: ['./search-owner-table.component.scss']
})
export class SearchOwnerTableComponent implements OnInit {

  @Input() dataSource: LandOwner[];
  @Input() length: number = 0;
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
  @Output() showLandsTable: EventEmitter<LandOwner> = new EventEmitter();

  displayedColumns = ['nro', 'documentType', 'dni', 'paternalSurname', 'maternalSurname', 'name', 'creationDate', 'lands'];
  pageIndex = 0;
  pageSize = 10;

  constructor() {}

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }

  onShowLandsTable(landOwner: LandOwner): void {
    this.showLandsTable.emit(landOwner);
  }

}
