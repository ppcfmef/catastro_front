import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { LandAnalisysUI } from '../../interfaces/land.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-without-geo-table',
  templateUrl: './land-without-geo-table.component.html',
  styleUrls: ['./land-without-geo-table.component.scss']
})
export class LandWithoutGeoTableComponent implements OnInit {
    @Input() dataSource: LandAnalisysUI[];
    @Input() length: number;
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    @Output() refreshPage: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['nro','ownerName','cpm', 'direccion','statusGapAnalisys','actions'];
    landSelected = new Set<any>();
    pageIndex = 0;
    pageSize = 5;
    pageSizeOptions = [1, 5, 10, 25, 50, 100, 250, 500];
  constructor( private _router: Router) { }

  ngOnInit(): void {
  }

  onPage(paginator: MatPaginator): void {
    this.pageIndex = paginator.pageIndex;
    this.changePage.emit(paginator);
  }
  onRefreshPage(): void {
    this.refreshPage.emit();
  }

  landSelection(land: LandAnalisysUI ): void {
    localStorage.setItem('idLand',String(land.id));
    //this._router.navigate(['./land-inspection/gap-analysis/geo/land',land.id]);
    this._router.navigate(['./land-inspection/gap-analysis/geo/land']);
  }

  redirecto(land: LandAnalisysUI ): void {
    localStorage.setItem('idLand',String(land.id));
    //this._router.navigate(['./land-inspection/gap-analysis/geo/land',land.id]);
    this._router.navigate(['./land-inspection/gap-analysis/geo/land']);
}



}
