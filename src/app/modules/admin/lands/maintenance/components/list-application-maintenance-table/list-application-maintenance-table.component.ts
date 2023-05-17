import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actions } from 'app/shared/enums/actions.enum';
import { ApplicationUI } from '../../interfaces/application';

@Component({
  selector: 'app-list-application-maintenance-table',
  templateUrl: './list-application-maintenance-table.component.html',
  styleUrls: ['./list-application-maintenance-table.component.scss']
})
export class ListApplicationMaintenanceTableComponent implements OnInit {
    @Input() ubigeo: string ;
    @Input() typeAction: string= Actions.LEER;
    @Input() dataSource: ApplicationUI[];
    @Output() dataSourceUpdateEvent: EventEmitter<ApplicationUI[]> = new EventEmitter();
    displayedColumns: string[] = ['nro','ubigeo', 'c_predios','type', 'status','date','username'];

  constructor() { }

  ngOnInit(): void {
  }

}
