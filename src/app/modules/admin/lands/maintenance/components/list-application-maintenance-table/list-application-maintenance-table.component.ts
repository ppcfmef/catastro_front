import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Actions } from 'app/shared/enums/actions.enum';
import { ApplicationUI } from '../../interfaces/application';

@Component({
  selector: 'app-list-application-maintenance-table',
  templateUrl: './list-application-maintenance-table.component.html',
  styleUrls: ['./list-application-maintenance-table.component.scss']
})
export class ListApplicationMaintenanceTableComponent implements OnInit {
    @Input() length: number;
    @Input() ubigeo: string ;
    @Input() typeAction: string= Actions.LEER;
    @Input() dataSource: ApplicationUI[];
    @Output() dataSourceUpdateEvent: EventEmitter<ApplicationUI[]> = new EventEmitter();
    @Output() changePage: EventEmitter<MatPaginator> = new EventEmitter();
    displayedColumns: string[] = ['nro','ubigeo', 'c_predios','type','date', 'status'];//,'username'
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

}
