import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LandRegistryMap } from '../../interfaces/land-registry-map.interface';

@Component({
  selector: 'app-land-summary-table',
  templateUrl: './land-summary-table.component.html',
  styleUrls: ['./land-summary-table.component.scss']
})
export class LandSummaryTableComponent implements OnInit {

  @Input() dataSource: LandRegistryMap[];
  @Input() length: number;
  @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
  @Output() seledRecord: EventEmitter<LandRegistryMap> = new EventEmitter();

  displayedColumns: string[] = ['nro', 'cup', 'cpm', 'steetName'];
  landSelected = new Set<any>();
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];

  constructor() { }

  ngOnInit(): void {
  }

  landSelection(landRecord: LandRegistryMap): void{
    this.landSelected.clear();
    this.landSelected.add(landRecord);
    this.seledRecord.emit(landRecord);
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }
}
